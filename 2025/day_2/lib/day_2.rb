# frozen_string_literal: true

require 'set'

# top level
module Day2
  def get_data(filename)
    result = []
    f = File.open(filename, 'r')
    f.each_line do |line|
      result = line.strip!.split(',')
    end
    f.close
    result
  end

  def get_pairs(data)
    result = []

    data.each do |pair|
      result.push(pair.split('-'))
    end
    result
  end

  def detect_double(data)
    return false if data.length.odd?
    return false if data[0] == '0'

    scanned = data.scan(/./)
    l = scanned.length / 2
    left = scanned[0..l - 1]
    right = scanned[l..]
    left.each_with_index do |num, idx|
      next unless num.to_i != right[idx].to_i

      return false
    end
    true
  end

  def sum_diapason(diapason)
    answer = 0
    dip = diapason.split('-')
    start = dip[0].to_i
    d_end = dip[1].to_i
    for i in start..d_end do
      answer += i if detect_double(i.to_s)
    end
    answer.to_i
  end

  def calculate_batch(data)
    sum = 0
    data.each do |diap|
      sum += sum_diapason(diap)
    end
    sum
  end
end
