from bs4 import BeautifulSoup


def obtain_value(id_name, html_resource):
    tag = html_resource.find("input", {"name": id_name})
    if tag is None:
        return None
    else:
        return tag.attrs["value"]


def login_payload(username, password, html_text):
    html_resource = BeautifulSoup(html_text, features="html.parser")
    login_payload_data = {
        "__WPPS": obtain_value("__WPPS", html_resource),
        "__LASTFOCUS": obtain_value("__LASTFOCUS", html_resource),
        "ctl00$mainCopy$ScriptManager1$HiddenField": obtain_value(
            "ctl00_mainCopy_ScriptManager1_HiddenField", html_resource
        ),
        "__EVENTTARGET": obtain_value("__EVENTTARGET", html_resource),
        "__EVENTARGUMENT": obtain_value("__EVENTARGUMENT", html_resource),
        "ctl00_subnavTreeview_ExpandState": obtain_value(
            "ctl00_subnavTreeview_ExpandState", html_resource
        ),
        "ctl00$_subnavTreeview_SelectedNode": obtain_value(
            "ctl00_subnavTreeview_SelectedNode", html_resource
        ),
        "ctl00$_subnavTreeview_PopulateLog": obtain_value(
            "ctl00_subnavTreeview_PopulateLog", html_resource
        ),
        "__VIEWSTATE": obtain_value("__VIEWSTATE", html_resource),
        "__VIEWSTATEGENERATOR": obtain_value("__VIEWSTATEGENERATOR", html_resource),
        "__EVENTVALIDATION": obtain_value("__EVENTVALIDATION", html_resource),
        "ctl00$mainCopy$Login1$UserName": username,
        "ctl00$mainCopy$Login1$Password": password,
        "ctl00$mainCopy$Login1$LoginButton": obtain_value(
            "ctl00$mainCopy$Login1$LoginButton", html_resource
        ),
    }
    return login_payload_data


def reset_table_payload(html_text):
    html_resource = BeautifulSoup(html_text, features="html.parser")
    reset_payload = {
        "__WPPS": obtain_value("__WPPS", html_resource),
        "__EVENTTARGET": obtain_value("__EVENTTARGET", html_resource),
        "__EVENTARGUMENT": obtain_value("__EVENTARGUMENT", html_resource),
        "__VIEWSTATE": obtain_value("__VIEWSTATE", html_resource),
        "__VIEWSTATEENCRYPTED": obtain_value("__VIEWSTATEENCRYPTED", html_resource),
        "__VIEWSTATEGENERATOR": obtain_value("__VIEWSTATEGENERATOR", html_resource),
        "__EVENTVALIDATION": obtain_value("__EVENTVALIDATION", html_resource),
        "ctl00$ToolbarContentPlaceHolder$Remove": obtain_value(
            "ctl00$ToolbarContentPlaceHolder$Remove", html_resource
        ),
    }
    return reset_payload


def create_connect_table_payload(html_text):
    html_resource = BeautifulSoup(html_text, features="html.parser")
    create_table_payload = {
        "__WPPS": obtain_value("__WPPS", html_resource),
        "__EVENTTARGET": obtain_value("__EVENTTARGET", html_resource),
        "__EVENTARGUMENT": obtain_value("__EVENTARGUMENT", html_resource),
        "__VIEWSTATE": obtain_value("__VIEWSTATE", html_resource),
        "__VIEWSTATEENCRYPTED": obtain_value("__VIEWSTATEENCRYPTED", html_resource),
        "__VIEWSTATEGENERATOR": obtain_value("__VIEWSTATEGENERATOR", html_resource),
        "__EVENTVALIDATION": obtain_value("__EVENTVALIDATION", html_resource),
        "ctl00$ToolbarContentPlaceHolder$CreateAndConnect": obtain_value(
            "ctl00$ToolbarContentPlaceHolder$CreateAndConnect", html_resource
        ),
    }
    return create_table_payload


def create_change_semester_payload(html_text, semester):
    html_resource = BeautifulSoup(html_text, features="html.parser")
    list_of_tables = html_resource.find(
        "table", id=lambda x: x and "gridStudenti" in x and x.endswith("gridStudenti")
    )
    ids = list_of_tables["id"]
    parameter = ids.replace("_", "$")
    new_payload = {
        "__WPPS": obtain_value("__WPPS", html_resource),
        "__EVENTTARGET": parameter,
        "__EVENTARGUMENT": "Select$" + str(semester),
        "__VIEWSTATE": obtain_value("__VIEWSTATE", html_resource),
        "__VIEWSTATEENCRYPTED": obtain_value("__VIEWSTATEENCRYPTED", html_resource),
        "__VIEWSTATEGENERATOR": obtain_value("__VIEWSTATEGENERATOR", html_resource),
        "__EVENTVALIDATION": obtain_value("__EVENTVALIDATION", html_resource),
    }
    return new_payload


def create_payload_change_course(index_course, html_text):
    html_resource = BeautifulSoup(html_text, features="html.parser")
    list_of_tables = html_resource.find(
        "table", id=lambda x: x and "GridViewNote" in x and x.endswith("GridViewNote")
    )
    ids = list_of_tables["id"]
    parameter = ids.replace("_", "$")
    new_payload = {
        "__WPPS": obtain_value("__WPPS", html_resource),
        "__EVENTTARGET": parameter,
        "__EVENTARGUMENT": "Select$" + str(index_course),
        "__VIEWSTATE": obtain_value("__VIEWSTATE", html_resource),
        "__VIEWSTATEENCRYPTED": obtain_value("__VIEWSTATEENCRYPTED", html_resource),
        "__VIEWSTATEGENERATOR": obtain_value("__VIEWSTATEGENERATOR", html_resource),
        "__EVENTVALIDATION": obtain_value("__EVENTVALIDATION", html_resource),
    }
    return new_payload
