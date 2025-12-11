#include "test.h"
#include "day_11.h"
#include <assert.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv) {
  test_read_file();
  test_build_graph();
  test_find_paht_to_out();
  return 0;
}

void test_read_file() {
  const char *got = read_file("./example.txt");
  const char *want = "Hello, world";
  assert(strcmp(got, want) != 0);
}

void test_build_graph() {
  struct Graph *graph = buildGraphFromData("./example.txt");
  printGraph(graph);
  assert(findYou(graph) == 1);
}

void test_find_paht_to_out() {
  struct Graph *graph = buildGraphFromData("./example.txt");
  int chords[2];
  find_elem(chords, graph, "out");
  for (int i = 0; i < 10; i++) {
    int size = getLenForIndex(graph, i);
    printf("index %d\n", i);
    elemInArray(graph->array[i], size - 1);
  }
  printf("first out {%d:%d}", chords[0], chords[1]);
}
