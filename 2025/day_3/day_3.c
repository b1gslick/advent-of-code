#include "day_3.h"
#include <math.h>
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

long double convert_to_2(int number[], int size) {
  long double value = 0;
  reverse_array(number, size);
  for (size_t i = 0; i < size; i++) {
    long double result = number[i] * pow(10, i);
    value += result;
  }
  reverse_array(number, size); // reverse back
  return value;
}

void get_high(char *token, int *start, int size) {
  for (size_t i = start[1]; i < size; i++) {
    int number = token[i] - 48;
    if (number > start[0]) {
      start[0] = number;
      start[1] = i;
    }
  }
}

void reverse_array(int arr[], int size) {
  for (int i = 0; i < size / 2; i++) {
    int temp = arr[i];
    arr[i] = arr[size - 1 - i];
    arr[size - 1 - i] = temp;
  }
}
