from bs4 import BeautifulSoup
import scripts.call_esims_functions as exp_esims


def extract_table(ending, html):
    html_resource = BeautifulSoup(html, features="html.parser")
    list_of_tables = html_resource.findAll(
        "table", id=lambda x: x and ending in x and x.endswith(ending)
    )
    if len(list_of_tables) == 1:
        return str(list_of_tables[0])
    else:
        result = [str(list_of_tables[i]) for i in range(len(list_of_tables))]
        return result


def create_dict_with_information(table_html, session, type, html_usage):
    result = dict()
    if type == 1:
        # pentru datele personale
        table_parser = BeautifulSoup(table_html, features="html.parser")
        turn = 0
        for row in table_parser.find_all("tr"):
            key = ""
            for cell in row.find_all("td"):
                if turn % 2 == 0:
                    result[str(cell.get_text(strip=True)).upper()] = ""
                    key = str(cell.get_text(strip=True)).upper()
                else:
                    result[key] = cell.get_text(strip=True)
                turn += 1
    elif type == 2:
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
                html_history = exp_esims.generate_course_history(
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
    elif type == 3:
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
    if len(result) == 1:
        return result[0]
    if len(result) != 0:
        return result
