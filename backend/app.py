import os 
import re
import json
import pandas as pd
from fastapi import FastAPI, UploadFile, Form, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from crewai import LLM, Agent, Task, Crew, Process
from dotenv import load_dotenv
import logging
import uvicorn

# ---------------- LOGGING ----------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
    handlers=[
        logging.FileHandler("fln_api.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("FLN-API")

load_dotenv()

# ---------------- CONFIG ----------------
os.environ["GEMINI_API_KEY"] = os.getenv('GOOGLE_API_KEY')
logger.info("Loaded GEMINI_API_KEY from environment.")

llm = LLM(
    model="gemini/gemini-2.5-flash-lite",
    temperature=0.7,
    response_format={"type": "json"}
)

# Load outcomes JSON once
try:
    with open('Activity_learning_outcome.json', 'r', encoding='utf-8') as f:
        learning_outcomes = json.load(f)
    logger.info("Learning outcomes JSON loaded successfully.")
except Exception as e:
    logger.exception("Failed to load Activity_learning_outcome.json")
    raise

# ---------------- FASTAPI ----------------
app = FastAPI(title="FLN Assessment & Plan API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Or ["http://localhost:3000"] for your React app only
    allow_credentials=True,
    allow_methods=["*"],        # Allow GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],        # Allow all headers
)

class StudentRow(BaseModel):
    data: dict   # student_row dictionary


@app.post("/generate_plan")
async def generate_plan(request: StudentRow):
    logger.info("Received /generate_plan request")
    assessment_data = request.data
    student_id = assessment_data.get("studentId")
    logger.debug(f"Assessment data keys: {list(assessment_data.keys())[:5]}...")

    try:
        # ---------------- Agents ----------------
        analysis_agent = Agent(
            role="Assessment & Outcome Analyzer",
            goal=(
                "1. Understand the Balwatika/Class JSON structure with levels (L1–L4) and stages (Entry/Exit).\n"
                "2. Read student assessment data and determine:\n"
                "   - Current class (1, 2)\n"
                "   - Current level (L1–L4)\n"
                "   - Current stage (Entry/Exit)\n"
                "3. Match Lakshya_ID codes in assessment data with those in the JSON.\n"
                "4. Identify which outcomes are fulfilled and which are missing.\n"
                "5. Provide a summary of strengths and weaknesses."
            ),
            backstory="Expert in mapping student test results to FLN learning outcomes, including class, level (L1–L4), and stage (Entry/Exit).",
            llm=llm
        )

        plan_agent = Agent(
            role="Learning Plan Generator",
            goal=(
                "Generate a personalized learning plan using the analysis:\n"
                "RULES for deciding the next stage:\n"
                "1. If current stage = Entry → Next stage = Exit of SAME level.\n"
                "2. If current stage = Exit → Next stage = Entry of the NEXT level (L+1).\n"
                "3. If current stage = L4 Exit (not last class) → Next stage = L1 Entry of the NEXT class.\n"
                "4. If current stage = L4 Exit of the LAST class (Class-2) → Only return {'status':'no_plan','summary':...}.\n\n"
                "The plan must include:\n"
                "- Current class, level, and stage\n"
                "- Next class, level, and stage (computed using rules above)\n"
                "- Analysis \n"
                "- Plan description\n"
                "- Suggested activities\n"
                "- Required outcomes not fulfilled\n\n"
                "- Required outcomes not fulfilled - it should be matched proplery it is very important"
                "Final JSON format:\n"
                "{'status':'plan','current_class':...,'current_level':...,'current_stage':...,'next_class':...,'next_level':...,'next_stage':...,'analysis':...,'plan_description':...,'suggested_activities':[...],'required_outcomes_not_fulfilled':[...]}."
            ),
            backstory="Specialist in FLN progression planning — ensures correct step-by-step mapping Entry→Exit→Next Level→Next Class.",
            llm=llm
        )

        # ---------------- TASKS ----------------
        analysis_task = Task(
            description=(
                f"Learning outcomes JSON:\n{json.dumps(learning_outcomes)}\n\n"
                f"Student assessment:\n{json.dumps(assessment_data)}\n\n"
                "Perform diagnostic analysis. Return JSON with keys:\n"
                "{'class':..., 'level':..., 'stage':..., 'fulfilled_outcomes':[...], 'missing_outcomes':[...], 'summary':...}"
            ),
            expected_output="JSON diagnostic analysis with class, level (L1–L4), and stage (Entry/Exit).",
            agent=analysis_agent
        )

        plan_task = Task(
            description=(
                "Using the analysis JSON, determine the NEXT stage based on these rules:\n"
                "- Entry → Exit of same level\n"
                "- Exit → Entry of next level\n"
                "- L4 Exit → move to next class L1 Entry\n"
                "- L4 Exit of Class-2 → {'status':'no_plan','summary':...}\n\n"
                "remember while giving current_level write  as *L1,l2,l3,l4* not as 1,2,3,4"
                "while giving -required_outcomes_not_fulfilled- will be * list of only descrption not code* "
                "Final JSON format:\n"
                "*anaysis and plan description should be in details  in atleast 10-15 lines each*, tone for both will be as a teacher eg. you have to do well in ..."
                "required_outcomes_not_fulfilled is outmoces currenlty not fullfilled it should not be empty"
                "{'status':'plan','current_level':...,'current_stage':...,'next_stage':...,'analysis':...,'plan_description':...,'suggested_activities':[...],'required_outcomes_not_fulfilled':[...]}."
            ),
            expected_output="JSON learning plan or no_plan",
            agent=plan_agent
        )

        crew = Crew(
            tasks=[analysis_task, plan_task],
            agents=[analysis_agent, plan_agent],
            llm=llm,
            process=Process.sequential,
            verbose=True,
        )

        result = crew.kickoff()
        raw = result.raw
        logger.debug(f"Raw LLM result: {raw[:500]}...")

        # Extract JSON from raw output
        match = re.search(r"```json(.*?)```", raw, re.DOTALL)
        if match:
            json_str = match.group(1).strip()
            plan_json = json.loads(json_str)
            if student_id:
                plan_json["studentId"] = student_id
            logger.info("Successfully generated plan JSON.")
            return plan_json
        else:
            logger.warning("No JSON block found in LLM response.")
            return {"error": "No JSON block found", "raw": raw}

    except Exception as e:
        logger.exception("Error during plan generation")
        return {"error": str(e)}

# Protect the app's entry point
if __name__ == "__main__":
    logger.info("Starting FLN FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
