from bs4 import BeautifulSoup


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
