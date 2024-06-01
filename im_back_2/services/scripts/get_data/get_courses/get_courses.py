from services.scripts.esims_functions.login import login
from services.scripts.esims_functions.reset_create_table import reset_create_table
from services.scripts.esims_functions.change_semester import change_semester
from services.scripts.extract_table.extract_table import extract_table
from services.scripts.extract_no_semester.extract_no_semester import extract_number_of_semester
from services.scripts.generate_dict.generate_dict import create_dict_with_information


def get_courses(username, password, semester):
    new_session = login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = reset_create_table(new_session)
        no_of_semester = extract_number_of_semester(reset_call.text)
        if semester > no_of_semester or semester <= 0:
            print("WRONG PARAMETER")
            return -1
        else:
            val = change_semester(session=new_session, html=reset_call, semester=semester - 1)
            info_semester = create_dict_with_information(
                extract_table("GridViewNote", val),
                new_session, 2, val)
            return info_semester
    else:
        print("LOGIN FAILED")
        return -2
