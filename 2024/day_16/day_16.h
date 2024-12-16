
struct array_2d {
  char val[1000][1000];
};

char *read_file(const char *filename);

void get_2d_array(char *data, struct array_2d *arr);
