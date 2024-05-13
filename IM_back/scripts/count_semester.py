from bs4 import BeautifulSoup
import scripts.extract as ext


def extract_number_of_semester(html_text):
    semester_table = ext.extract_table("_gridStudenti", html_text)
    parser_table = BeautifulSoup(semester_table, features="html.parser")
    list_of_rows = parser_table.find_all("tr")
    return len(list_of_rows) - 1
