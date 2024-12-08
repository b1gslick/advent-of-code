from day_8.main import find_antennas, read_data, get_antinodes


def test_read_data_from_file():
    data = read_data("./example.txt")
    assert len(data) > 0


def test_get_antennas():
    data = read_data("./example.txt")
    table = find_antennas(data)
    assert table == {
        "0": [(1, 8), (2, 5), (3, 7), (4, 4)],
        "A": [(5, 6), (8, 8), (9, 9)],
    }


def test_caclulate_antinodes():
    data = read_data("./example.txt")
    table = find_antennas(data)
    assert get_antinodes(table, len(data), len(data[0])) == 14


def test_calculate_real_input():
    data = read_data("./input.txt")
    table = find_antennas(data)
    assert get_antinodes(table, len(data), len(data[0])) == 14
