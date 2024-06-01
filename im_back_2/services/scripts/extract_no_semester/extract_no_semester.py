from bs4 import BeautifulSoup
from services.scripts.extract_table.extract_table import extract_table


def extract_number_of_semester(html_text):
    semester_table = extract_table("_gridStudenti", html_text)
    parser_table = BeautifulSoup(semester_table, features="html.parser")
    list_of_rows = parser_table.find_all("tr")
    return len(list_of_rows) - 1
