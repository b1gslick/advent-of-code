#include "test.h"
#include "day_1.h"
#include <assert.h>
#include <stdio.h>
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
  int answer = 0;

  char *token = strtok(got, "\n");
  int result_rotate = 50;

  int click = 0;
  while (token != NULL) {
    size_t length = strlen(token);
    int digits = 0;
    char turn = token[0];
    // for (size_t i = 1; i < length; i++) {
    if (length == 4) {
      digits += (int)(token[1] - 48) * 100;
      digits += (int)(token[2] - 48) * 10;
      digits += (int)token[3] - 48;
    } else if (length == 3) {
      digits += (int)(token[1] - 48) * 10;
      digits += (int)token[2] - 48;
    } else {
      digits += (int)token[1] - 48;
    }
    if (turn == 'R') {
      result_rotate = right_rotate(result_rotate, digits);
    } else {
      result_rotate = left_rotate(result_rotate, digits);
    }

    if (result_rotate == 0) {
      answer++;
    }
    token = strtok(NULL, "\n");
  }
  printf("answer is %d\n", answer);
}
