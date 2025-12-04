import pytest
from day_4.main import (
    calculate_neibords,
    get_accessed_paper,
    get_all_chars,
    in_border,
    read_data,
    sum_2_arrays,
)


# data = read_data("./example.txt")
data = read_data("./input.txt")


def test_read_data_from_file():
    assert len(data) > 0


def test_sum_2_arrays():
    chords = [5, 5]
    direction = [-1, -1]
    assert sum_2_arrays(chords, direction) == [4, 4]


def test_border_check():
    chords = [-1, -1]
    assert in_border(chords, data) is False


@pytest.mark.parametrize(
    "chord, expected",
    [
        ([0, 2], 3),
        ([1, 2], 6),
    ],
)
def test_calculate_neibords(chord, expected):
    assert calculate_neibords(data, chord) == expected


def test_near_paper_or_not():
    assert len(get_all_chars(data, "@")) == 11848


def test_pappers_can_be_accesses():
    all_pappers = get_all_chars(data, "@")
    assert get_accessed_paper(data, all_pappers) == 1389
