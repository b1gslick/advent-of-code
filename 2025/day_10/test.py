import sys

D = sys.stdin.read()

ans = 0
for line in D.splitlines():
    words = line.split()
    goal = words[0]
    goal = goal[1:-1]
    goal_n = 0
    for i, c in enumerate(goal):
        if c == "#":
            goal_n += 2**i
    buttons = words[1:-1]

    B = []

    for button in buttons:
        ns = [int(x) for x in button[1:-1].split(",")]
        button_n = sum(2**x for x in ns)
        B.append(button_n)

    score = len(buttons)

    for a in range(2 ** len(buttons)):
        an = 0
        a_score = 0
        for i in range(len(buttons)):
            if ((a >> i) % 2) == 1:
                an ^= B[i]
                a_score += 1
            if an == goal_n:
                score = min(score, a_score)
    ans += score
print(ans)
