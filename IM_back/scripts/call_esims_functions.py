import requests as rq
import scripts.create_payloads as c_pay


def login(username, password):
    login_url = "https://simsweb.uaic.ro/eSIMS/MyLogin.aspx"

    with rq.session() as session:
        login_page = session.get(login_url)
        if login_page.status_code == 200:
            login_payload = c_pay.login_payload(username, password, login_page.text)
            respond = session.post(login_url, data=login_payload)
            if respond.url == "https://simsweb.uaic.ro/eSIMS/default.aspx":
                return session
            else:
                return False


def reset_create_table(session):
    students = session.get("https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx")
    if students.status_code == 200:
        payload = c_pay.reset_table_payload(students.text)
        reset_req = session.post(
            "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx", data=payload
        )
        create_payload = c_pay.create_connect_table_payload(reset_req.text)
        table_page = session.post(
            "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx",
            data=create_payload,
        )
        return table_page
    else:
        return False


def change_semester(session, html, semester):
    change_payload = c_pay.create_change_semester_payload(html.text, semester=semester)
    create_html = session.post(
        "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx", data=change_payload
    )
    return create_html.text


def generate_course_history(session, index_course, html):
    history_payload = c_pay.create_payload_change_course(
        index_course=index_course, html_text=html
    )
    change_course = session.post(
        "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx", data=history_payload
    )
    return change_course.text
