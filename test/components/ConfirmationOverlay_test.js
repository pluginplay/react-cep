import React from 'react'
import { shallow } from 'enzyme'
import { expect, withTheme } from '../setup'
import renderer from 'react-test-renderer'
import SystemState from '../../src/components/SystemState'
import ConfirmationOverlay from '../../src/components/ConfirmationOverlay'

import Overlay from '../../src/components/Overlay'
import Button from '../../src/components/Button'

let systemState = null
let hideConfirmationSpy = null

beforeEach(() => {
  hideConfirmationSpy = jest.spyOn(SystemState.prototype, 'hideConfirmation')
  systemState = new SystemState()
  systemState.showConfirmationOverlay = true
  systemState.confirmationMessage = 'Hello world?'
})

afterEach(() => {
  hideConfirmationSpy.mockRestore()
})

const getWrapper = () => {
  return shallow(<ConfirmationOverlay systemState={systemState} />)
}

it('is only visible when showConfirmationOverlay is true', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(Overlay).first()).to.have.prop('visible').equal(true)
})

it('displays the proper message', () => {
  const wrapper = getWrapper()
  expect(wrapper.find('div')).to.have.text('Hello world?')
})

it('calls hideConfirmation when the button is clicked', () => {
  const wrapper = getWrapper()
  wrapper.find(Button).first().simulate('click')
  jestExpect(hideConfirmationSpy).toHaveBeenCalledTimes(1)
})

it('calls systemState.confirmationCallback when the button is clicked', () => {
  const confirmationCallback = jest.fn()
  systemState.confirmationCallback = confirmationCallback
  const wrapper = getWrapper()
  wrapper.find(Button).first().simulate('click')
  jestExpect(confirmationCallback).toHaveBeenCalledTimes(1)
})

it('renders the proper HTML structure', () => {
  const tree = renderer
    .create(withTheme(<ConfirmationOverlay systemState={systemState} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})
