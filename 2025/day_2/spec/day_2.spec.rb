# frozen_string_literal: true

require_relative '../lib/day_2'

RSpec.describe 'testing day 2 chalenge' do
  include Day2
  context 'test' do
    it 'should read data from file' do
      data = get_data('./example.txt')
      expect(data.length).to be > 0
    end

    %w[11 22 1188511885].each do |num|
      it "#{num} should return #{num}" do
        detected_double_sum = detect_double(num)
        expect(detected_double_sum).to eq true
      end
    end

    [
      ['11-22', 33],
      ['95-115', 99],
      ['1698522-1698528', 0],
      ['565653-565659', 0],
      ['824824821-824824827', 0],
      ['2121212118-2121212124', 0],
      ['1188511880-1188511890', 1_188_511_885],
      ['222220-222224', 222_222],
      ['38593856-38593862', 38_593_859],
      ['446443-446449', 446_446]
    ].each do |nums|
      it "#{nums[0]} should return #{nums[1]}" do
        sum_double_diapason = sum_diapason(nums[0])
        expect(sum_double_diapason).to eq nums[1]
      end
    end

    it '0101 should return false' do
      expect(detect_double('0101')).to eq false
    end

    it 'iterate over date should return answer' do
      data = get_data('./example.txt')
      expect(calculate_batch(data)).to eq 1_227_775_554
    end

    it 'iterate over date should return answer real' do
      data = get_data('./real.txt')
      expect(calculate_batch(data)).to eq 1_227_775_554
    end
  end
end
