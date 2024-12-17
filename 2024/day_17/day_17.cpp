
#include "./day_17.h"
#include <cmath>
#include <csignal>
#include <cstdio>
#include <iostream>
#include <string>

int binaryToDecimal(int n) {
  int num = n;
  int dec_value = 0;

  int base = 1;

  int temp = num;
  while (temp) {
    int last_digit = temp % 10;
    temp = temp / 10;

    dec_value += last_digit * base;

    base = base * 2;
  }

  return dec_value;
}

unsigned long long DecimalCodedBinary(unsigned int n) {
  unsigned long long pow10 = 1;
  unsigned long long result = 0;
  while (n) {
    result += pow10 * (n % 2);
    n /= 2;
    pow10 *= 10;
  }
  return result;
}

unsigned long long Pow10(int exponent) {
  if (exponent < 0)
    return 0;
  unsigned long long pow10 = 10;
  unsigned long long result = 1;
  while (exponent) {
    if (exponent % 2)
      result *= pow10;
    exponent /= 2;
    pow10 *= pow10;
  }
  return result;
}

unsigned long long LowDigitsDecimal(unsigned long long nr, int count) {
  unsigned long long modulo = Pow10(count);
  return nr % modulo;
}

int get_operand(register_value *reg, int choose) {
  switch (choose) {
  case 0:
  case 1:
  case 2:
  case 3:
    return choose;

  case 4:
    return *&reg->A;
  case 5:
    return *&reg->B;
  case 6:
    return *&reg->C;
  case 7:
    raise(-1);
  }
  return -1;
}

int opcode_0(register_value *reg, int denominator) {
  int res = reg->A / pow(2, denominator);
  reg->A = res;
  return res;
}
int opcode_6(register_value *reg, int denominator) {
  int res = reg->A / pow(2, denominator);
  reg->B = res;
  return res;
}
int opcode_7(register_value *reg, int denominator) {
  int res = reg->A / pow(2, denominator);
  reg->C = res;
  return res;
}

void opcode_1(register_value *reg, int operand) { reg->B = reg->B ^ operand; }

void opcode_2(register_value *reg, int operand) {
  int res = operand % 8;
  unsigned long long dcb_val = DecimalCodedBinary(res);
  unsigned long long dcb_val_low_3 = LowDigitsDecimal(dcb_val, 3);
  reg->B = binaryToDecimal(dcb_val_low_3);
}

void opcode_4(register_value *reg) { reg->B = reg->B ^ reg->C; }

std::string opcode_5(int numerator) { return std::to_string(numerator % 8); }

std::string do_job(register_value *reg) {
  std::string result = "";
  for (int ip = 0; ip < reg->inst.size();) {
    switch (*&reg->inst[ip]) {
    case 0:
      opcode_0(reg, get_operand(reg, *&reg->inst[ip + 1]));
      ip += 2;
      break;
    case 1:
      opcode_1(reg, *&reg->inst[ip + 1]);
      ip += 2;
      break;
    case 2:
      opcode_2(reg, get_operand(reg, *&reg->inst[ip + 1]));
      ip += 2;
      break;
    case 4:
      opcode_4(reg);
      ip += 2;
      break;
    case 5:
      result += opcode_5(get_operand(reg, *&reg->inst[ip + 1]));
      result += ",";
      ip += 2;
      break;
    case 6:
      opcode_6(reg, get_operand(reg, *&reg->inst[ip + 1]));
      ip += 2;
      break;
    case 7:
      opcode_7(reg, get_operand(reg, *&reg->inst[ip + 1]));
      ip += 2;
      break;
    case 3:
      if (*&reg->A == 0) {
        ip += 2;
        break;
      } else {
        ip = *&reg->inst[ip + 1];
        break;
      }
      break;
    default:
      break;
    }
    cout << result << "\n";
  }
  if (result.size() > 0) {

    result.pop_back();
  }
  return result;
}
