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

int right_rotate(int start, int times) { return ((start + times) % 100); }

int left_rotate(int start, int times) {
  int res = (start - times) % 100;
  if (res < 0) {
    return res + 100;
  }
  return res;
}
