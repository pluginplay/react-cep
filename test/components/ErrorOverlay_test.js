import React from 'react'
import { shallow } from 'enzyme'
import { expect, withTheme } from '../setup'
import { getDefaultTheme } from '../../src/lib/theme'
import renderer from 'react-test-renderer'
import SystemState from '../../src/models/SystemState'
import ErrorOverlay from '../../src/components/ErrorOverlay'

import Overlay from '../../src/components/Overlay'
import MonospaceContent from '../../src/components/MonospaceContent'

let systemState = null
let showConfirmationSpy = null
let hideErrorMessageSpy = null

beforeEach(() => {
  showConfirmationSpy = jest.spyOn(SystemState.prototype, 'showConfirmation')
  hideErrorMessageSpy = jest.spyOn(SystemState.prototype, 'hideErrorMessage')
  systemState = new SystemState()
  systemState.showErrorOverlay = true
  systemState.errorMessage = 'foobar'
})

afterEach(() => {
  showConfirmationSpy.mockRestore()
  hideErrorMessageSpy.mockRestore()
})

const getWrapper = (props = {}) => {
  return shallow(<ErrorOverlay theme={getDefaultTheme()} systemState={systemState} {...props} />).dive()
}

it('is only visible when showErrorOverlay is true', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(Overlay).first()).to.have.prop('visible').equal(true)
})

it('hides the error message when close is clicked', () => {
  const wrapper = getWrapper()
  wrapper.find('a').findWhere(a => a.text() === 'Close').first().simulate('click')
  jestExpect(hideErrorMessageSpy).toHaveBeenCalledTimes(1)
})

it('displays an explanation when "What does this mean?" is clicked', () => {
  const wrapper = getWrapper()
  wrapper.find('a').findWhere(a => a.text() === 'What does this mean?').first().simulate('click')
  expect(showConfirmationSpy.mock.calls).to.have.length(1)
  expect(showConfirmationSpy.mock.calls[0][0]).to.be.a('string')
})

context('when report is clicked', () => {
  it('hides the error message', () => {
    const wrapper = getWrapper()
    wrapper.find('a.send-button').first().simulate('click')
    jestExpect(hideErrorMessageSpy).toHaveBeenCalledTimes(1)
  })

  it('calls the onReportClicked callback if it exists', () => {
    const onReportClicked = jest.fn()
    const wrapper = getWrapper({ onReportClicked })
    wrapper.find('a.send-button').first().simulate('click')
    jestExpect(onReportClicked).toHaveBeenCalledTimes(1)
  })
})

it('displays the proper error message', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(MonospaceContent).first().children().first()).to.have.text('foobar')
})

it('renders the proper HTML structure', () => {
  const tree = renderer
    .create(withTheme(<ErrorOverlay systemState={systemState} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})
