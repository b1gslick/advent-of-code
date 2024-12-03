# frozen_string_literal: true

require_relative '../lib/day_3'

RSpec.describe 'testing day 3 chalenge' do
  include DayThree
  context 'test' do
    it 'should detect mul(x,y)' do
      test_input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
      want = [[2, 4], [5, 5], [11, 8], [8, 5]]
      expect(get_number(test_input)).to eq(want)
    end

    it 'should calculate from list' do
      want = 161
      test_input = [[2, 4], [5, 5], [11, 8], [8, 5]]
      expect(calculate(test_input)).to eq(want)
    end

    it 'it should read info from file and calculate result' do
      file = open('/Users/sergei.timokhin/Private/advent-of-code/2024/day_3/input.txt')
      data = file.read
      number = get_number(data)
      result = calculate(number)
      expect(result).to eq(183_669_043)
    end

    it 'should be read data from memory with instructions' do
      test_input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
      want = [[2, 4], [8, 5]]
      expect(get_after_instruction(test_input)).to eq(want)
    end
  end
end
