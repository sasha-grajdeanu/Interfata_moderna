import json
import scripts.get_scholar_situation_semester as get_courses
import scripts.get_grades_evolution as get_grades
import scripts.get_selection as get_sec

if __name__ == "__main__":
    x = get_sec.get_selection("310910401RSL211128", "Yugosl@via1", 2)
    # y = pers_data.get_personal_data("310910401RSL211128", "Yugosl@via1")
    with open("info.json", "w", encoding="utf-8") as json_file:
        json.dump(x, json_file, indent=4, ensure_ascii=False)