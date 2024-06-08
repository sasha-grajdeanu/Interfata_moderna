from services.scripts.esims_functions.change_semester import change_semester
from services.scripts.esims_functions.login import login
from services.scripts.esims_functions.reset_create_table import reset_create_table
from services.scripts.extract_no_semester.extract_no_semester import extract_number_of_semester
from services.scripts.extract_table.extract_table import extract_table
from services.scripts.generate_dict.generate_dict import create_dict_with_information


def get_selection(username, password):
    new_session = login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = reset_create_table(new_session)
        no_of_semester = extract_number_of_semester(reset_call.text)
        result = list();
        for i in range(no_of_semester):
            val = change_semester(session=new_session, html=reset_call, semester=i)
            info_semester = create_dict_with_information(
                extract_table("GridView1", val), new_session, 3, val)
            result.append(info_semester[0])
        return result

    else:
        print("logare esuata")
        return False
