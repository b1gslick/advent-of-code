#include "test.h"
#include "day_1.h"
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv) {
  test_read_file();
  test_calcuate_password();
  return 0;
}

void test_read_file() {
  const char *got = read_file("./example.txt");
  const char *want = "Hello, world";
  assert(strcmp(got, want) != 0);
}

void test_calcuate_password() {
  char *got = read_file("./real.txt");
  // char *got = read_file("./example.txt");
  // char *got = read_file("./more.txt");
  int new_answer = {0};

  char *token = strtok(got, "\n");
  int result_rotate = 50;
  int clicks = {0};

  while (token != NULL) {
    size_t length = strlen(token);
    char new_line[3];
    int digits = 0;
    char turn = token[0];
    // for (size_t i = 1; i < length; i++) {
    convert_to_number(new_line, token);
    digits = atoi(new_line);
    result_rotate = turns(result_rotate, digits, turn, &clicks, &new_answer);
    token = strtok(NULL, "\n");
  }
  printf("answer is %d\n", clicks + new_answer);
}
