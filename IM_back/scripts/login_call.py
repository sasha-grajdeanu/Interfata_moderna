import requests as rq
import scripts.create_payloads as c_pay


def login_check(username, password):
    login_url = "https://simsweb.uaic.ro/eSIMS/MyLogin.aspx"
    with rq.session() as session:
        login_page = session.get(login_url)
        if login_page.status_code == 200:
            login_payload = c_pay.login_payload(username, password, login_page.text)
            respond = session.post(login_url, data=login_payload)
            if respond.url == "https://simsweb.uaic.ro/eSIMS/default.aspx":
                return True
            else:
                return False
