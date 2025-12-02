#include <stdio.h>
int main(int argc, char *argv[]) {

  int d = -180;
  int div = 100;

  int res = d % div;
  printf("%d\n", res + 100);
  return 0;
}
