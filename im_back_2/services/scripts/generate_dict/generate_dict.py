from bs4 import BeautifulSoup
from services.scripts.extract_table.extract_table import extract_table
from services.scripts.esims_functions.generate_course_history import generate_course_history


def create_dict_with_information(table_html, session, type_of_tabel, html_usage):
    result = dict()
    if type_of_tabel == 1:
        # pentru datele personale
        print(type(table_html))
        table_parser = BeautifulSoup(table_html, features="html.parser")
        turn = 0
        for row in table_parser.find_all("tr"):
            key = ""
            for cell in row.find_all("td"):
                if turn % 2 == 0:
                    key = str(cell.get_text(strip=True)).upper()
                else:
                    result[key] = cell.get_text(strip=True)
                turn += 1
    elif type_of_tabel == 2:
        # tabelul cu materii + accesarea tabelelor cu materii (History)
        result = list()
        table_parser = BeautifulSoup(table_html, features="html.parser")
        header = list()
        no_line = -1
        for row in table_parser.find_all("tr"):
            index = 0
            # print(row)
            materie = dict()
            for cell in row.find_all("th"):
                if cell.get_text(strip=True) != "":
                    header.append(cell.get_text(strip=True))
            for cell in row.find_all("td"):
                if cell.get_text(strip=True) != "[detalii]":
                    key = header[index]
                    materie[key] = cell.get_text(strip=True)
                    index += 1
            if no_line > -1:
                html_history = generate_course_history(
                    session, no_line, html_usage
                )
                new_tab = extract_table("GridViewNoteIstoric", html_history)
                history_of_grades = create_dict_with_information(
                    new_tab, session, 3, html_history
                )
                materie["Istoric"] = history_of_grades
            no_line += 1
            if len(list(materie.keys())) != 0:
                result.append(materie)
    elif type_of_tabel == 3:
        # alte tabele
        result = list()
        table_parser = BeautifulSoup(table_html, features="html.parser")
        header = list()
        no_line = -1
        for row in table_parser.find_all("tr"):
            index = 0
            materie = dict()
            for cell in row.find_all("th"):
                if cell.get_text(strip=True) != "":
                    header.append(cell.get_text(strip=True))
            if len(header) == 0:
                break
            for cell in row.find_all("td"):
                if cell.get_text(strip=True) != "[detalii]":
                    key = header[index]
                    materie[key] = cell.get_text(strip=True)
                    index += 1
            no_line += 1
            if len(list(materie.keys())) != 0:
                result.append(materie)
    if len(result) != 0:
        return result
