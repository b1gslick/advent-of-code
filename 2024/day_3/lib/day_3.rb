# frozen_string_literal: true

# top level
module DayThree
  def get_number(line)
    prev = mul?(line)
    result = []

    prev.each do |pr|
      answer = pr.scan(/\d+,\d+/)
      numbers = answer[0].split(',')
      result.push([numbers[0].to_i, numbers[1].to_i])
    end

    result
  end

  def mul?(str)
    str.scan(/mul\(\d+,\d+\)/)
  end

  def calculate(list)
    result = 0
    list.each do |number|
      result += (number[0] * number[1])
    end
    result
  end

  def get_after_instruction(line)
    # print(line =~ /do\(\)/)
    # print(line =~ /don't\(\)/)
    #   line.each_byte do |i|
    #     puts i.chr # Fixnum#chr converts any number to the ASCII char it represents
    #   end
    #   oo
    _test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    meet_dont = line =~ /don't\(\)/
    first_part = mul?(line[0..meet_dont])
    print(first_part)
    print(line[meet_dont..])
    first_do = line[meet_dont..line.length] =~ /do\(\)/
    print("\n")
    print(line[first_do..line.length])
  end
end
