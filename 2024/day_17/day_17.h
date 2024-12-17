#ifndef DAY_17_H // To make sure you don't declare the function more than once
                 // by
                 // including the header multiple times.
#define DAY_17_H

#include <string>
#include <vector>
using namespace std;

struct register_value {
  int A;
  int B;
  int C;
  vector<int> inst;
};

int get_operand(register_value *reg, int choose);

int opcode_0(register_value *reg, int denominator);
int opcode_6(register_value *reg, int denominator);
int opcode_7(register_value *reg, int denominator);
void opcode_2(register_value *reg, int operand);
void opcode_1(register_value *reg, int operand);
void opcode_4(register_value *reg);

std::string opcode_5(int numerator);

std::string do_job(register_value *reg);

unsigned long long DecimalCodedBinary(unsigned int n);
unsigned long long Pow10(int exponent);
unsigned long long LowDigitsDecimal(unsigned long long nr, int count);
int binaryToDecimal(int n);

#endif
