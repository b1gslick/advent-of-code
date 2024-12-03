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
  end
end
