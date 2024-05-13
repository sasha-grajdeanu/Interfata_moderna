import scripts.call_esims_functions as exp_esims
import scripts.count_semester as count_sem
import scripts.extract as ext


def get_no_semester(username, password):
    new_session = exp_esims.login(username=username, password=password)
    if not isinstance(new_session, bool):
        reset_call = exp_esims.reset_create_table(new_session)
        no_of_semester = count_sem.extract_number_of_semester(reset_call.text)
        return {"No. of semester" : no_of_semester}
    else:
        print("logare esuata");
        return False
