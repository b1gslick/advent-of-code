# frozen_string_literal: true

require_relative '../lib/day_23'

RSpec.describe 'testing day 23 chalenge' do
  include Day23
  context 'test' do
    it 'should read data from file' do
      data = get_data('./example.txt')
      expect(data.length).to be > (0)
    end
  end

  it 'network len for 3 is 12' do
    data = get_data('./example.txt')
    networks = get_net(data)
    print networks
    expect(networks.length).to be == (16)
  end

  it 'buld net with T named pc len is 7' do
    data = get_data('./example.txt')
    networks = get_net(data)
    build_n = build_networks_with_t(networks)
    build_t = get_t_named(build_n)
    expect(build_t.length).to be == (7)
  end

  it 'calculate real example' do
    data = get_data('./real.txt')
    networks = get_net(data)
    build_n = build_networks_with_t(networks)
    build_t = get_t_named(build_n)
    expect(build_t.length).to be == (7)
  end
end
