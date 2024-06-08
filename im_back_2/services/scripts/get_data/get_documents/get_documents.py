from services.scripts.esims_functions.login import login
from services.scripts.esims_functions.reset_create_table import reset_create_table
from services.scripts.extract_table.extract_table import extract_table
from services.scripts.generate_dict.generate_dict import create_dict_with_information


def get_documents(username, password):
    new_session = login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = reset_create_table(new_session)
        info_semester = create_dict_with_information(
            extract_table("GridViewDocPlata", reset_call.text), new_session, 3, reset_call.text)
        if info_semester is None:
            info_semester = dict()
            info_semester["message"] = "Nu sunt înregistrări de afişat."
        return info_semester
    else:
        return False
