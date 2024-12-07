def read_data(path: str) -> dict[int, list[int]]:
    file = open(path)
    table = {}
    for line in file.readlines():
        first, second = line.split(": ")
        rows = [int(x) for x in second.rsplit()]
        table[int(first)] = rows

    return table


def calculate(
    etalon: int,
    row: list[int],
) -> bool:
    if len(row) == 1:
        return etalon == row[0]
    if etalon % row[-1] == 0 and calculate(etalon // row[-1], row[:-1]):
        return True
    if etalon > row[-1] and calculate(etalon - row[-1], row[:-1]):
        return True
    return False


def calculate_all(table: dict[int, list[int]]) -> int:
    result = 0
    for k, v in table.items():
        if calculate(k, v):
            result += k
    return result
