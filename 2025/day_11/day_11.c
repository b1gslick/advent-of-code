#include "day_11.h"
#include <stddef.h>
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

struct AdjListNode *newAdjListNode(char *dest) {
  struct AdjListNode *newNode = malloc(sizeof(struct AdjListNode));
  newNode->dest = dest;
  newNode->next = NULL;
  return newNode;
}

struct Graph *createGraph(int V) {
  struct Graph *graph = malloc(sizeof(struct Graph));
  graph->V = V;
  graph->array = calloc(V, sizeof(struct AdjListNode *));
  return graph;
}

void addEdge(struct Graph *graph, int src, char *child) {
  struct AdjListNode *node = newAdjListNode(child);
  node->next = graph->array[src];
  graph->array[src] = node;
}

char *getNElement(struct Graph *graph, int index, int n) {
  int counter = 0;
  for (struct AdjListNode *cur = graph->array[index]; cur; cur = cur->next) {
    if (counter == n) {
      return cur->dest;
    }
    counter++;
  }
  return NULL;
}

int getLenForIndex(struct Graph *graph, int index) {
  int counter = 0;
  for (struct AdjListNode *cur = graph->array[index]; cur; cur = cur->next) {
    counter++;
  }
  return counter;
}

void printGraph(struct Graph *graph) {
  for (int i = 0; i < graph->V; i++) {
    printf("%d:", i);
    for (struct AdjListNode *cur = graph->array[i]; cur; cur = cur->next) {
      printf(" %s", cur->dest);
    }
    printf("\n");
  }
}

int findParent(struct Graph *graph, char *target) {
  for (int i = 0; i < graph->V; i++) {
    int len = getLenForIndex(graph, i);
    char *p = getNElement(graph, i, len - 1);
    if (strcmp(p, target) == 0) {
      return i;
    }
  }
  return -1;
}

int findYou(struct Graph *graph) { return findParent(graph, "you"); }

struct Graph *buildGraphFromData(const char *filename) {
  char *got = read_file(filename);
  char *token;
  char *end_str;

  const char s[2] = "\n";
  token = strtok_r(got, s, &end_str);

  struct Graph *graph = createGraph(10);

  int index = 0;
  while (token != NULL) {
    char *sep = strchr(token, ':');

    *sep = '\0';
    char *parent = token;
    char *childs = sep + 1;

    char *end_token2;

    const char p[2] = " ";
    char *token2 = strtok_r(childs, p, &end_token2);

    addEdge(graph, index, parent);
    while (token2 != NULL) {
      addEdge(graph, index, token2);
      token2 = strtok_r(NULL, p, &end_token2);
    }
    index++;
    token = strtok_r(NULL, s, &end_str);
  }
  return graph;
}

size_t get_rows_count(char *data) {
  int count = 0;
  for (int i = 0; i < strlen(data); i++) {
    if (data[i] == '\n') {
      count++;
    }
  }
  return count;
}

void find_elem(int chords[2], struct Graph *graph, char *target) {
  for (int i = 0; i < graph->V; i++) {
    int count = 0;
    for (struct AdjListNode *cur = graph->array[i]; cur; cur = cur->next) {
      if (strcmp(cur->dest, target) == 0) {
        chords[0] = i;
        chords[1] = count;
        return;
      }
      count++;
    }
  }
}

void goFromTo(int from, char *to) {}

int elemInArray(struct AdjListNode *array, int size) {
  int i = 0;
  for (struct AdjListNode *cur = &array[i]; cur; cur = cur->next) {
    printf(" %s", cur->dest);
    i++;
    if (i >= size) {
      break;
    }
  }
  return 0;
}
