import sys

input = sys.stdin.read()


def build_graph(data):
    graph = {}
    for d in data.split("\n"):
        if len(d) > 0:
            head, child = d.split(":")
            graph[head] = child.strip().split(" ")

    return graph


def findPaths(graph, src, dest):
    allPaths = []
    path = []

    dfs(src, dest, graph, path, allPaths)

    return allPaths


def dfs(src, dest, graph, path, allPaths):
    # Add the current vertex to the path
    path.append(src)

    # Store the path when destination is reached
    if src == dest:
        allPaths.append(path.copy())
    else:
        for adj_node in graph[src]:
            dfs(adj_node, dest, graph, path, allPaths)

    # remove the current vertex from the path
    path.pop()


res = findPaths(build_graph(input), "svr", "out")
counter = 0
for r in res:
    if ("fft" in r) and ("dac" in r):
        counter += 1

print(counter)
