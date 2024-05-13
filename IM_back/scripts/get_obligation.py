import scripts.call_esims_functions as exp_esims
import scripts.count_semester as count_sem
import scripts.extract as ext


def get_obligation(username, password, semester):
    new_session = exp_esims.login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = exp_esims.reset_create_table(new_session)
        no_of_semester = count_sem.extract_number_of_semester(reset_call.text)
        if semester > no_of_semester or semester <= 0:
            print("Valoare gresita pentru semestru")
            return False
        else:
            val = exp_esims.change_semester(session=new_session, html=reset_call, semester=semester - 1)
            info_semester = dict()
            beta = ext.extract_table("GridViewTaxe", val)
            if isinstance(beta, list):
                result = ext.create_dict_with_information(beta[0], new_session, 3, val)
                if result is not None:
                    info_semester = result
                else:
                    info_semester["msg"] = "Nu sunt înregistrări de afişat."
            return info_semester
    else:
        print("logare esuata");
        return False
