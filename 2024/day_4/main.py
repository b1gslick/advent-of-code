def search2D(grid, row, col, word):
    m = len(grid)
    n = len(grid[0])

    # return false if the given coordinate
    # does not match with first index char.
    if grid[row][col] != word[0]:
        return False

    lenWord = len(word)

    # x and y are used to set the direction in which
    # word needs to be searched.
    # x = [-1, -1, -1, 0, 0, 1, 1, 1]
    # y = [-1, 0, 1, -1, 1, -1, 0, 1]
    x = [
        -1,
        1,
    ]
    y = [
        -1,
        1,
    ]

    count = 0

    # This loop will search in all the 8 directions
    # one by one. It will return true if one of the
    # directions contain the word.
    for dir in range(2):
        # Initialize starting point for current direction
        currX, currY = row + x[dir], col + y[dir]
        k = 1

        while k < lenWord:
            # break if out of bounds
            if currX >= m or currX < 0 or currY >= n or currY < 0:
                break

            # break if characters dont match
            if grid[currX][currY] != word[k]:
                break

            # Moving in particular direction
            currX += x[dir]
            currY += y[dir]
            k += 1

        # If all character matched, then value of must
        # be equal to length of word
        if k == lenWord:
            print("dir", dir)
            print("Found ", currX, currY)
            count += 1

    # if word is not found in any direction,
    # then return false
    return count


# This function calls search2D for each coordinate


def searchWord(grid, word):
    m = len(grid)
    n = len(grid[0])

    count = 0

    for i in range(m):
        for j in range(n):
            count += search2D(grid, i, j, word)

    return count


if __name__ == "__main__":
    file = open("input.txt")
    grid = []
    for line in file.readlines():
        temp = []
        for letter in line:
            if len(letter.strip()) > 0:
                temp.append(letter.strip())
        grid.append(temp)

    word = "MAS"

    ans = searchWord(grid, word)
    print(ans)
