def read_data(path: str) -> list[str]:
    return [line.strip() for line in open(path)]


def sum_2_arrays(first: list[int], second: list[int]) -> list[int]:
    return [first[0] + second[0], first[1] + second[1]]


def in_border(chords: list[int], data: list[str]) -> bool:
    r = len(data) - 1
    c = len(data[0]) - 1
    if chords[0] < 0 or chords[1] < 0:
        return False
    if chords[0] > r or chords[1] > c:
        return False
    return True


def calculate_neibords(data: list[str], chord: list[int]) -> int:
    result = 0
    matrix = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    for m in matrix:
        check_chord = sum_2_arrays(chord, m)
        if in_border(check_chord, data):
            r = check_chord[0]
            c = check_chord[1]
            if data[r][c] == "@":
                result += 1

    return result


def get_all_chars(data: list[str], to_find: str) -> list[list[int]]:
    result = []

    for r, row in enumerate(data):
        for c, char in enumerate(row):
            if char == to_find:
                result.append([r, c])

    return result


def get_accessed_paper(data: list[str], pp: list[list[int]]) -> int:
    answer = 0
    for p in pp:
        if calculate_neibords(data, p) < 4:
            answer += 1
    return answer


def remove_all_pappers():
    pass
