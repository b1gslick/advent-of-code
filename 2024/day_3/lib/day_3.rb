# frozen_string_literal: true

# top level
module DayThree
  def get_number(line)
    return has_mul(line)
    [[]]
  end

  def has_mul(str)
    prev = str.scan(/mul\(\d+,\d+\)/)

    result = []

    for pr in prev do
      first, second = pr.scan(/\d+,\d+/)
      result.push([first, second])
    end

    result
  end
end
