import services.scripts.payloads.generate_payloads as payloads


def generate_course_history(session, index_course, html):
    history_payload = payloads.create_payload_change_course(
        index_course=index_course, html_text=html
    )
    change_course = session.post(
        "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx", data=history_payload
    )
    return change_course.text
