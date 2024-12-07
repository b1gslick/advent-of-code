from day_7.main import read_data, calculate, calculate_all


def test_read_files_and_store_data():
    table = read_data("./example.txt")
    assert table == {
        190: [10, 19],
        3267: [81, 40, 27],
        83: [17, 5],
        156: [15, 6],
        7290: [6, 8, 6, 15],
        161011: [16, 10, 13],
        192: [17, 8, 14],
        21037: [9, 7, 18, 13],
        292: [11, 6, 16, 20],
    }


def test_result_with_only_sum():
    table = read_data("./example.txt")
    assert calculate(190, table[190]) is True
    assert calculate(192, table[192]) is False
    assert calculate(292, table[292]) is True
    assert (
        calculate(
            3267,
            table[3267],
        )
        is True
    )


def test_example_all():
    table = read_data("./example.txt")
    assert calculate_all(table) == 3749


def test_real_input():
    table = read_data("./input.txt")
    assert calculate_all(table) == 1038838357795
