
import pandas as pd
import json

# Load Excel
df = pd.read_excel("FLN1 EE.xlsx", sheet_name="FLN 1 Exit")

# Convert to list of dicts (all rows)
all_students = df.to_dict(orient="records")


# Save to file
with open("fln_exit.json", "w", encoding="utf-8") as f:

    json.dump(all_students, f, indent=4, ensure_ascii=False)

print("✅ Saved all students into students.json")





# Load Excel
df = pd.read_excel("FLN1 EE.xlsx", sheet_name="FLN 1 Entry")

# Convert to list of dicts (all rows)
all_students = df.to_dict(orient="records")


# Save to file
with open("fln_entry.json", "w", encoding="utf-8") as f:

    json.dump(all_students, f, indent=4, ensure_ascii=False)

print("✅ Saved all students into students.json")





# import pandas as pd
# import requests

# # Load Excel
# df = pd.read_excel("FLN1 EE.xlsx", sheet_name="FLN 1 Exit")
# student_row = df.iloc[5].to_dict()

# print(student_row)
# resp = requests.post("http://127.0.0.1:8000/generate_plan", json={"data": student_row})
# print(resp.json())