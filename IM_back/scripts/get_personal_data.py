import scripts.call_esims_functions as exp_esims
import scripts.extract as ext


def get_personal_data(username, password):
    new_session = exp_esims.login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = exp_esims.reset_create_table(new_session)
        info_semester = ext.create_dict_with_information(
            ext.extract_table("DetailsView1", reset_call.text),
            new_session, 1, reset_call.text)
        return info_semester
    else:
        return False
