import React from 'react'
import { shallow } from 'enzyme'
import { expect, withTheme } from '../setup'
import renderer from 'react-test-renderer'
import SystemState from '../../src/components/SystemState'
import SimpleMessageOverlay from '../../src/components/SimpleMessageOverlay'

import Overlay from '../../src/components/Overlay'
import { getDefaultTheme } from '../../src/lib/theme'

let systemState = null

beforeEach(() => {
  systemState = new SystemState()
  systemState.simpleMessageVisible = true
  systemState.simpleMessage = 'Hello world!'
})

const getWrapper = () => {
  return shallow(<SimpleMessageOverlay theme={getDefaultTheme()} systemState={systemState} />).dive()
}

it('is only visible when simpleMessageVisible is true', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(Overlay).first()).to.have.prop('visible').equal(true)
})

it('displays the proper message', () => {
  const wrapper = getWrapper()
  expect(wrapper.find('p')).to.have.text('Hello world!')
})

it('renders the proper HTML structure', () => {
  const tree = renderer
    .create(withTheme(<SimpleMessageOverlay systemState={systemState} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})
