
#include "./day_19.h"
#include <algorithm>
#include <bits/stdc++.h>
#include <cstdio>
#include <fstream>
#include <string>
#include <vector>

std::vector<std::string> split(std::string str, char delimiter) {
  std::stringstream ss(str);
  std::vector<std::string> res;
  std::string token;
  while (getline(ss, token, delimiter)) {

    token.erase(std::remove_if(token.begin(), token.end(), ::isspace),
                token.end());
    res.push_back(token);
  }
  return res;
}

void getDataFromFile(std::string filename, data *Data) {
  std::ifstream file;

  file.open(filename);

  if (file.fail()) {
    perror(filename.c_str());
    return;
  }

  std::string line;
  int i = 0;

  std::vector<std::string> designs;

  while (!file.eof()) {
    std::getline(file, line);
    if (i == 0) {
      Data->towels = split(line, ',');
      i++;
    } else if (!line.empty()) {
      designs.push_back(line);
    }
  }
  Data->design = designs;
}

bool possibleDesign(std::string design,
                    std::vector<std::string> *possibleDesigns) {
  int i = 0;
  int j = design.size() + 1;
  int l = design.size() + 1;
  for (;;) {
    if (i >= design.size()) {
      return true;
    }
    std::string to_find = design.substr(i, j);
    if (wordInVector(to_find, possibleDesigns)) {
      i += j;
      j = design.size() + 1;
      continue;
    } else {
      if (j <= 0) {
        return false;
      }
      j--;
    }
  }

  std::cout << design << std::endl;
  return true;
}

bool wordInVector(std::string word, std::vector<std::string> *vec) {
  return std::find(vec->begin(), vec->end(), word) != vec->end();
}

int getCountPossible(data *Data) {
  int count = 0;
  for (auto des : Data->design) {
    if (possibleDesign(des, &Data->towels)) {
      count++;
    }
  }

  return count;
}
