# frozen_string_literal: true

require 'set'

# top level
module Day23
  def get_data(filename)
    result = []
    f = File.open(filename, 'r')
    f.each_line do |line|
      result.push(line.strip!)
    end
    f.close
    result
  end

  def get_net(data)
    result = {}

    data.each do |pair|
      l, r = pair.split('-')
      result[l] = Set.new unless result.include?(l)
      result[r] = Set.new unless result.include?(r)
      result[l].add(r)
      result[r].add(l)
    end

    result
  end

  def build_networks_with_t(data)
    networks = Set.new
    data.each_key do |x|
      for y in data[x]
        for z in data[y]
          networks.add([x, y, z].sort) if x != z && data[z].include?(x)
        end
      end
    end

    networks
  end

  # set of the networks
  def get_t_named(data)
    result = []
    data.each do |network|
      network.each do |name|
        if name.start_with?('t')
          result.push(network)
          break
        end
      end
    end
    result
  end
end
