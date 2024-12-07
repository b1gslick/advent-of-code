total = 0


def can_obtain(target, array):
    if len(array) == 1:
        return target == array[0]
    if target % array[-1] == 0 and can_obtain(target // array[-1], array[:-1]):
        return True
    if target > array[-1] and can_obtain(target - array[-1], array[:-1]):
        return True
    return False


for line in open("input.txt"):
    left, right = line.split(": ")
    target = int(left)
    array = [int(x) for x in right.split()]
    if can_obtain(target, array):
        total += target

print(total)
