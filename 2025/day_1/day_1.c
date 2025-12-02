#include "day_1.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const int border = 99;

char *read_file(const char *filename) {
  char *fcontent = NULL;
  FILE *fp;
  int buffer_size = 0;

  int c, i = 0;

  fp = fopen(filename, "r");

  while ((c = fgetc(fp)) != EOF) {
    if (i >= buffer_size) {
      buffer_size += 1000;
      fcontent = realloc(fcontent, buffer_size);
      if (fcontent == NULL) {
        printf("Error: Memmory allocation failed\n");
      }
    }
    fcontent[i] = c;
    i++;
  }
  return fcontent;
}

int search_password(const char *input) { return 0; }

int right_rotate(int start, int times) { return start + times; }

int left_rotate(int start, int times) { return start - times; }

int calculate_mod(int number) {
  int res = (number) % 100;
  if (res < 0) {
    return res + 100;
  }
  return res;
}

int turns(int start, int times, int direction, int clicks[], int answer[]) {
  int click = 0;

  // if (start == 0 && direction == 'L') {
  //   start = 100;
  // }
  if (direction == 'R') {
    for (int i = 0; i < times; i++) {
      if (start == 99) {
        if (i == times - 1) {
          break;
        }
        start = 0;
        click += 1;
      } else {
        start += 1;
      }
    }

  } else {
    for (int j = 0; j < times; j++) {
      if (start == 0) {
        if (j == times - 1) {
          break;
        }
        start = 100;
        click += 1;
      }
      start -= 1;
    }
  }
  if (start == 0) {
    answer[0] += 1;
  }
  clicks[0] += click;

  printf("answer is %d\n", clicks[0] + answer[0]);
  return start;
}

void convert_to_number(char *new_line, char *line) {
  strcpy(new_line, &line[1]);
}
