import requests as rq
from services.scripts.payloads.generate_payloads import login_payload


def login(username, password):
    login_url = "https://simsweb.uaic.ro/eSIMS/MyLogin.aspx"

    with rq.session() as session:
        login_page = session.get(login_url)
        if login_page.status_code == 200:
            login_payloads = login_payload(username, password, login_page.text)
            respond = session.post(login_url, data=login_payloads)
            if respond.url == "https://simsweb.uaic.ro/eSIMS/default.aspx":
                return session
            else:
                return False
