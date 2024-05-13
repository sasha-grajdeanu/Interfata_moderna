import scripts.call_esims_functions as exp_esims
import scripts.count_semester as count_sem
import scripts.extract as ext


def create_semester_data(username, password, semester):
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
            info_semester["Date personale"] = ext.create_dict_with_information(ext.extract_table("DetailsView1", val),
                                                                               new_session, 1, val)
            info_semester["Detalii selectie facuta"] = ext.create_dict_with_information(
                ext.extract_table("GridView1", val), new_session, 3, val)
            info_semester["Traiectorie student"] = ext.create_dict_with_information(
                ext.extract_table("GridViewMedii", val), new_session, 3, val)
            info_semester["Situatie scolara"] = ext.create_dict_with_information(ext.extract_table("GridViewNote", val),
                                                                                 new_session, 2, val)
            info_semester["Documente de plata"] = ext.create_dict_with_information(
                ext.extract_table("GridViewDocPlata", val), new_session, 3, val)
            beta = ext.extract_table("GridViewTaxe", val)
            if isinstance(beta, list):
                for i in range(len(beta)):
                    if i == 0:
                        result = ext.create_dict_with_information(beta[i], new_session, 3, val)
                        if result is not None:
                            info_semester["Obligatii"] = result
                    else:
                        info_semester["Istoric taxe"] = ext.create_dict_with_information(beta[i], new_session, 3, reset_call)
            return info_semester
    else:
        print("logare esuata");
        return False
