#include "test.h"
#include "day_16.h"
#include <assert.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
  test_read_file();
  test_build_2darray();
  return 0;
}

void test_read_file() {
  const char *got = read_file("./example.txt");
  const char *want = "Hello, world";
  assert(strcmp(got, want) != 0);
}

void test_build_2darray() {
  char *data = read_file("./simple.txt");
  struct array_2d arr = {};

  get_2d_array(data, &arr);
  printf("the char is: %s\n", &arr.val[0][0]);
  printf("the char is: %s\n", &arr.val[0][1]);
  printf("the char is: %s\n", &arr.val[1][0]);
  printf("the char is: %s\n", &arr.val[1][1]);
  assert(arr.val[0][0] == '#');
  assert(arr.val[0][1] == '#');
  assert(arr.val[1][0] == '.');
  assert(arr.val[1][1] == '.');
}
