#include "test.h"
#include "day_3.h"
#include <assert.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv) {
  read_number_in_reverse_order();
  // test_read_file();
  return 0;
}

void test_read_file() {
  const char *got = read_file("./example.txt");
  const char *want = "Hello, world";
  printf("%s", got);
  assert(strcmp(got, want) != 0);
}

void read_number_in_reverse_order() {
  char *got = read_file("./real.txt");
  const char s[2] = "\n";
  char *token;

  token = strtok(got, s);
  long sum = 0;
  int times = 12;

  while (token != NULL) {
    int result[times];

    int start[2] = {0, 0};
    for (int k = 0; k < times; k++) {
      size_t length = strlen(token);
      get_high(token, start, length - times + k + 1);
      result[k] = start[0];
      start[1] += 1;
      start[0] = 0;
    }

    size_t length = sizeof(result) / sizeof(result[0]);
    sum += convert_to_2(result, length);
    token = strtok(NULL, "\n");
  }
  printf("result is %ld\n", sum);
}
