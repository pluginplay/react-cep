import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { expect, withTheme } from '../setup'
import { getDefaultTheme } from '../../src/lib/theme'
import TabNavigation from '../../src/components/TabNavigation'

import TabNavigationButton from '../../src/components/TabNavigationButton'

let tabs = null

beforeEach(() => {
  tabs = [
    { identifier: 'tab-1', title: 'Tab 1', icon: 'one' },
    { identifier: 'tab-2', title: 'Tab 2', icon: 'two' },
    { identifier: 'tab-3', title: 'Tab 3', icon: 'three' }
  ]
})

const getWrapper = (props = {}) => {
  return shallow(<TabNavigation theme={getDefaultTheme()} tabs={tabs} selectedTab={'tab-2'} onTabSelected={() => null} {...props} />).dive()
}

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<TabNavigation tabs={tabs} selectedTab={'tab-2'} onTabSelected={() => null} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('renders the configured tabs', () => {
  const wrapper = getWrapper()
  const navigationButtons = wrapper.find(TabNavigationButton)
  expect(navigationButtons).to.have.length(3)
  expect(navigationButtons.at(0).key()).to.equal('tab-1')
  expect(navigationButtons.at(1).key()).to.equal('tab-2')
  expect(navigationButtons.at(2).key()).to.equal('tab-3')
  expect(navigationButtons.at(0).find('img').first()).to.have.prop('src').equal('icons/one.svg')
  expect(navigationButtons.at(1).find('img').first()).to.have.prop('src').equal('icons/two.svg')
  expect(navigationButtons.at(2).find('img').first()).to.have.prop('src').equal('icons/three.svg')
  expect(navigationButtons.at(0).find('img').first()).to.have.prop('alt').equal('Tab 1')
  expect(navigationButtons.at(1).find('img').first()).to.have.prop('alt').equal('Tab 2')
  expect(navigationButtons.at(2).find('img').first()).to.have.prop('alt').equal('Tab 3')
})

it('calls onTabSelected when a new tab is selected', () => {
  const onTabSelected = jest.fn()
  const wrapper = getWrapper({ onTabSelected })
  wrapper.find(TabNavigationButton).first().simulate('click')
  jestExpect(onTabSelected).toHaveBeenCalledTimes(1)
  jestExpect(onTabSelected).toHaveBeenCalledWith('tab-1')
})

it('marks selectedTab as selected', () => {
  const wrapper = getWrapper({ selectedTab: 'tab-1' })
  const firstTab = wrapper.find(TabNavigationButton).first()
  expect(firstTab).to.have.prop('isSelected').equal(true)
  expect(firstTab.key()).to.equal('tab-1')
})
