import scripts.call_esims_functions as exp_esims
import scripts.count_semester as count_sem
import scripts.extract as ext


def get_history_payment(username, password):
    new_session = exp_esims.login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = exp_esims.reset_create_table(new_session)
        info_semester = dict()
        beta = ext.extract_table("GridViewTaxe", reset_call.text)
        if isinstance(beta, list):
            info_semester = ext.create_dict_with_information(beta[1], new_session, 3, reset_call.text)
        return info_semester
    else:
        print("logare esuata");
        return False
