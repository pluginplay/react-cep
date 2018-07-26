import React from 'react'
import { shallow } from 'enzyme'
import { expect, withTheme } from '../setup'
import renderer from 'react-test-renderer'
import SystemState from '../../src/models/SystemState'
import DebugOverlay from '../../src/components/DebugOverlay'

import Overlay from '../../src/components/Overlay'
import MonospaceContent from '../../src/components/MonospaceContent'

let systemState = null
let clearDebugSpy = null

beforeEach(() => {
  clearDebugSpy = jest.spyOn(SystemState.prototype, 'clearDebug')
  systemState = new SystemState()
  systemState.showDebugOverlay = true
  systemState.debugMessage = 'foobar'
})

afterEach(() => {
  clearDebugSpy.mockRestore()
})

const getWrapper = () => {
  return shallow(<DebugOverlay systemState={systemState} />)
}

it('is only visible when showDebugOverlay is true', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(Overlay).first()).to.have.prop('visible').equal(true)
})

it('hides the debug overlay when close is clicked', () => {
  const wrapper = getWrapper()
  wrapper.find('a').findWhere(a => a.text() === 'Close').first().simulate('click')
  jestExpect(clearDebugSpy).toHaveBeenCalledTimes(1)
})

it('displays the proper debug text', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(MonospaceContent).first().children().first()).to.have.text('foobar')
})

it('renders the proper HTML structure', () => {
  const tree = renderer
    .create(withTheme(<DebugOverlay systemState={systemState} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})
