from openpyxl import load_workbook


def readExcel(path):
    book = load_workbook(
        "C:/Users/altou/OneDrive/Desktop/Capstone/lauCourseOffering_Backend/backend/Students _Courses.xlsx")
    sheet = book.active

    rows = sheet.rows

    headers = [cell.value for cell in next(rows)]
    all_rows = []
    for row in rows:
        data = {}
        courses = []

        for title, cell in zip(headers, row):
            index = row.index(cell)
            if index > 0 and index <= 3:
                data[title] = cell.value

            elif index > 3:
                if cell.value == 1 or cell.value == 0:
                    courses.append(title)

        data['courses'] = courses
        all_rows.append(data)
    return all_rows

## now I need to fill the database with Students and their courses!
