import services.scripts.payloads.generate_payloads as payloads


def change_semester(session, html, semester):
    change_payload = payloads.create_change_semester_payload(html.text, semester=semester)
    create_html = session.post(
        "https://simsweb.uaic.ro/eSIMS/Members/StudentPage.aspx", data=change_payload
    )
    return create_html.text
