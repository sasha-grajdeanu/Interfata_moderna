import services.scripts.payloads.generate_payloads as payloads


def reset_create_table(session):
    students = session.get("https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx")
    if students.status_code == 200:
        payload = payloads.reset_table_payload(students.text)
        reset_req = session.post(
            "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx", data=payload
        )
        create_payload = payloads.create_connect_table_payload(reset_req.text)
        table_page = session.post(
            "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx",
            data=create_payload,
        )
        return table_page
    else:
        return False