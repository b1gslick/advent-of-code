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
    _test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    copy_line = line.clone
    result = []

    meet_dont = line =~ /don't\(\)/
    result += get_number(line[0..meet_dont])
    new_line = copy_line[meet_dont..]
    first_do = new_line =~ /do\(\)/
    result += get_number(new_line[first_do..])

    result
  end
end
