from services.scripts.esims_functions.login import login
from services.scripts.esims_functions.reset_create_table import reset_create_table
from services.scripts.extract_no_semester.extract_no_semester import extract_number_of_semester


def get_no_semester(username, password):
    new_session = login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = reset_create_table(new_session)
        no_of_semester = extract_number_of_semester(reset_call.text)
        return {"No. of semester": no_of_semester}
    else:
        print("logare esuata")
        return False
