from services.scripts.esims_functions.reset_create_table import reset_create_table
from services.scripts.esims_functions.login import login
from services.scripts.extract_table.extract_table import extract_table
from services.scripts.generate_dict.generate_dict import create_dict_with_information


def get_personal_data(username, password):
    new_session = login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = reset_create_table(new_session)
        info_semester = create_dict_with_information(
            extract_table("DetailsView1", reset_call.text),
            new_session, 1, reset_call.text)
        return info_semester
    else:
        return False
