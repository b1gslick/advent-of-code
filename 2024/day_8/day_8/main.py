def read_data(path: str) -> list[str]:
    return [line.strip() for line in open(path)]


def find_antennas(data: list[str]) -> dict[str, list[tuple[int, int]]]:
    antennas = {}
    for r, row in enumerate(data):
        for c, char in enumerate(row):
            if char != ".":
                if char not in antennas:
                    antennas[char] = []
                antennas[char].append((r, c))
    return antennas


def get_antinodes(
    antennas: dict[str, list[tuple[int, int]]], rows: int, cols: int
) -> int:
    antinodes = set()

    for array in antennas.values():
        for i in range(len(array)):
            for j in range(i + 1, len(array)):
                r1, c1 = array[i]
                r2, c2 = array[j]
                antinodes.add((2 * r1 - r2, 2 * c1 - c2))
                antinodes.add((2 * r2 - r1, 2 * c2 - c1))

    return len([0 for r, c in antinodes if 0 <= r < rows and 0 <= c < cols])
