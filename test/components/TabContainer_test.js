import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { expect, withTheme } from '../setup'
import { getDefaultTheme } from '../../src/lib/theme'
import TabContainer from '../../src/components/TabContainer'

import TabNavigation from '../../src/components/TabNavigation'

let tabs = null

class TabA extends React.Component { render () { return <div>Tab A</div> } }
class TabB extends React.Component { render () { return <div>Tab B</div> } }
class TabC extends React.Component { render () { return <div>Tab C</div> } }

beforeEach(() => {
  tabs = [
    { identifier: 'tab-1', title: 'Tab 1', icon: 'one', component: TabA },
    { identifier: 'tab-2', title: 'Tab 2', icon: 'two', component: TabB },
    { identifier: 'tab-3', title: 'Tab 3', icon: 'three', component: TabC }
  ]
})

const getWrapper = (props = {}) => {
  return shallow(<TabContainer theme={getDefaultTheme()} tabs={tabs} {...props} />).dive()
}

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<TabContainer tabs={tabs} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('sets the default tab to the first tab', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(TabA)).to.have.length(1)
  expect(wrapper.find(TabB)).to.have.length(0)
  expect(wrapper.find(TabC)).to.have.length(0)
  expect(wrapper.find(TabNavigation).first()).to.have.prop('selectedTab').equal('tab-1')
})

context('second tab selected', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = getWrapper()
    wrapper.find(TabNavigation).first().simulate('tabSelected', 'tab-2')
  })

  it('marks the second tab as selected in TabNavigation', () => {
    expect(wrapper.find(TabNavigation).first()).to.have.prop('selectedTab').equal('tab-2')
  })

  it('renders the component corresponding with the second tab', () => {
    expect(wrapper.find(TabA)).to.have.length(0)
    expect(wrapper.find(TabB)).to.have.length(1)
    expect(wrapper.find(TabC)).to.have.length(0)
  })
})

