#include <stddef.h>
#include <stdint.h>
char *read_file(const char *filename);

struct AdjListNode {
  char *dest;
  struct AdjListNode *next;
};

size_t get_rows_count(char *data);

struct Graph {
  int V;
  struct AdjListNode **array;
};

struct AdjListNode *newAdjListNode(char *dest);
struct Graph *createGraph(int V);
void addEdge(struct Graph *graph, int src, char *dest);
void printGraph(struct Graph *graph);
char *getNElement(struct Graph *graph, int index, int n);

int getLenForIndex(struct Graph *graph, int index);

int findParent(struct Graph *graph, char *target);

int findYou(struct Graph *graph);
void find_elem(int chords[2], struct Graph *graph, char *target);

struct Graph *buildGraphFromData(const char *filename);

void goFromTo(int from, char *to);

int elemInArray(struct AdjListNode *array, int size);
