#include "./day_17.h"
#include <cstdio>
#include <gtest/gtest.h>
#include <iostream>
#include <string>

register_value Value;

TEST(ReadFileFromExample, BasicAssertions) {
  Value.A = 729;
  Value.B = 0;
  Value.C = 0;
  Value.inst = {0, 1, 5, 4, 3, 0};
  EXPECT_EQ(Value.A, 729);
}

TEST(Opcode0, BasicAssertions) {
  Value.A = 729;
  Value.inst = {0, 1};
  do_job(&Value);
  EXPECT_EQ(Value.A, 364);
}

TEST(Opcode6, BasicAssertions) {
  Value.A = 729;
  Value.inst = {6, 1};
  do_job(&Value);
  EXPECT_EQ(Value.B, 364);
}
TEST(Opcode7, BasicAssertions) {
  Value.A = 729;
  Value.inst = {7, 1};
  do_job(&Value);
  EXPECT_EQ(Value.C, 364);
}

TEST(Opcode3, BasicAssertions) {
  Value.A = 729;
  Value.B = 0;
  Value.C = 0;
  Value.inst = {0, 1, 5, 4, 3, 0};
  string exp = "4,6,3,5,6,3,5,2,1,0";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
}

TEST(example3, BasicAssertions) {
  Value.A = 2024;
  Value.B = 0;
  Value.C = 0;
  Value.inst = {0, 1, 5, 4, 3, 0};
  string exp = "4,2,5,6,7,7,7,7,3,1,0";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
}
TEST(example1, BasicAssertions) {
  Value.A = 0;
  Value.B = 0;
  Value.C = 9;
  Value.inst = {2, 6};
  string exp = "";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
  EXPECT_EQ(Value.B, 1);
}

TEST(example2, BasicAssertions) {
  Value.A = 10;
  Value.B = 0;
  Value.C = 0;
  Value.inst = {5, 0, 5, 1, 5, 4};
  string exp = "0,1,2";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
}

TEST(example4, BasicAssertions) {
  Value.A = 0;
  Value.B = 29;
  Value.C = 0;
  Value.inst = {1, 7};
  string exp = "";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
  EXPECT_EQ(Value.B, 26);
}

TEST(example5, BasicAssertions) {
  Value.A = 0;
  Value.B = 2024;
  Value.C = 43690;
  Value.inst = {4, 0};
  string exp = "";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
  EXPECT_EQ(Value.B, 44354);
}
TEST(Real, BasicAssertions) {
  Value.A = 21539243;
  Value.B = 0;
  Value.C = 0;
  Value.inst = {2, 4, 1, 3, 7, 5, 1, 5, 0, 3, 4, 1, 5, 5, 3, 0};
  string exp = "6,7,5,2,1,3,5,1,7";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
}

TEST(RealCopy, BasicAssertions) {
  Value.A = 1;
  Value.B = 0;
  Value.C = 0;
  Value.inst = {2, 4, 1, 3, 7, 5, 1, 5, 0, 3, 4, 1, 5, 5, 3, 0};
  string exp = "2, 4, 1, 3, 7, 5, 1, 5, 0, 3, 4, 1, 5, 5, 3, 0";
  string res = do_job(&Value);
  while (exp != res) {
    Value.A *= 2;
    res = do_job(&Value);
  }
  printf("minimal A is %d\n", Value.A);
}

TEST(CopyItSelf, BasicAssertions) {
  Value.A = 117440;
  Value.B = 0;
  Value.C = 0;
  Value.inst = {0, 3, 5, 4, 3, 0};
  string exp = "0,3,5,4,3,0";
  string res = do_job(&Value);
  EXPECT_EQ(res, exp);
}
//
/**
Register A: 21539243
Register B: 0
Register C: 0

Program: 2,4,1,3,7,5,1,5,0,3,4,1,5,5,3,0
* **/
