from services.scripts.esims_functions.login import login
from services.scripts.esims_functions.reset_create_table import reset_create_table
from services.scripts.esims_functions.change_semester import change_semester
from services.scripts.extract_table.extract_table import extract_table
from services.scripts.extract_no_semester.extract_no_semester import extract_number_of_semester
from services.scripts.generate_dict.generate_dict import create_dict_with_information


def get_obligation(username, password, semester):
    new_session = login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = reset_create_table(new_session)
        no_of_semester = extract_number_of_semester(reset_call.text)
        if semester > no_of_semester or semester <= 0:
            print("Valoare gresita pentru semestru")
            return False
        else:
            val = change_semester(session=new_session, html=reset_call, semester=semester - 1)
            info_semester = dict()
            beta = extract_table("GridViewTaxe", val)
            if isinstance(beta, list):
                result = create_dict_with_information(beta[0], new_session, 3, val)
                if result is not None:
                    info_semester = result
                else:
                    info_semester["message"] = "Nu sunt înregistrări de afişat."
            return info_semester
    else:
        print("logare esuata")
        return False
