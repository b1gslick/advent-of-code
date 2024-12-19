#ifndef DAY_19_H // To make sure you don't declare the function more than once
                 // by
                 // including the header multiple times.
#define DAY_19_H

#include <string>
#include <vector>

struct data {
  std::vector<std::string> towels;
  std::vector<std::string> design;
};

void getDataFromFile(std::string filename, data *Data);

std::vector<std::string> split(std::string str, char delim);

bool possibleDesign(std::string design,
                    std::vector<std::string> *possibleDesigns);

bool wordInVector(std::string word, std::vector<std::string> *vec);

int getCountPossible(data *Data);

#endif
