#include "./day_19.h"
#include <gtest/gtest.h>
#include <string>
#include <vector>

TEST(ReadFileFromExample, BasicAssertions) {
  data Data;
  getDataFromFile("/home/timon/projects/advent-of-code/2024/day_19/example.txt",
                  &Data);
  std::vector<std::string> expect_t = {"r",   "wr", "b",  "g",
                                       "bwu", "rb", "gb", "br"};
  std::vector<std::string> exepct_d = {"brwrr", "bggr",   "gbbr", "rrbgbr",
                                       "ubwu",  "bwurrg", "brgr", "bbrgwb"};
  EXPECT_EQ(Data.towels, expect_t);
  EXPECT_EQ(Data.design, exepct_d);
}

TEST(FirstWordIsPossible, BasicAssertions) {
  data Data;
  getDataFromFile("/home/timon/projects/advent-of-code/2024/day_19/example.txt",
                  &Data);
  EXPECT_EQ(possibleDesign(Data.design[0], &Data.towels), true);
}

TEST(UnPossibleUBWU, BasicAssertions) {
  data Data;
  getDataFromFile("/home/timon/projects/advent-of-code/2024/day_19/example.txt",
                  &Data);
  EXPECT_EQ(possibleDesign(Data.design[4], &Data.towels), false);
}

TEST(UbPossible_bbrgwb, BassiceAssertions) {
  data Data;
  getDataFromFile("/home/timon/projects/advent-of-code/2024/day_19/example.txt",
                  &Data);
  EXPECT_EQ(possibleDesign(Data.design[7], &Data.towels), false);
}

TEST(CalculateAllPossible, BasicAssertions) {
  data Data;
  getDataFromFile("/home/timon/projects/advent-of-code/2024/day_19/example.txt",
                  &Data);
  int count = getCountPossible(&Data);
  EXPECT_EQ(count, 6);
}

TEST(RealExampe, BasicAssertions) {
  data Data;
  getDataFromFile("/home/timon/projects/advent-of-code/2024/day_19/real.txt",
                  &Data);
  int count = getCountPossible(&Data);
  EXPECT_EQ(count, 313);
}
