#include "day_16.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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

void get_2d_array(char *data, struct array_2d *arr) {
  int i = 0;
  char *p = strtok(data, "\n");
  while (p != NULL) {
    printf("i = %d\n", i);
    printf("p = %s\n", p);
    arr->val[0][i++] = *p;
    p = strtok(NULL, "\n");
  }
  printf("array %s\n", *arr->val);
}
