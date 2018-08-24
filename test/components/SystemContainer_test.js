import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { expect } from '../setup'
import SystemState from '../../src/components/SystemState'
import SystemContainer from '../../src/components/SystemContainer'
import { ThemeProvider } from 'styled-components'
import { getDefaultTheme } from '../../src/lib/theme'
import * as csInterface from 'cep-lib/csinterface'
import ErrorOverlay from '../../src/components/ErrorOverlay'

let showConfirmationSpy = null
let setErrorMessageSpy = null
let addDebugMessageSpy = null
let showDebugSpy = null
let hideProgressSpy = null
let addEventListenerMock = null
let systemState = null

jest.mock('cep-lib/csinterface')

beforeEach(() => {
  showConfirmationSpy = jest.spyOn(SystemState.prototype, 'showConfirmation')
  setErrorMessageSpy = jest.spyOn(SystemState.prototype, 'setErrorMessage')
  showDebugSpy = jest.spyOn(SystemState.prototype, 'showDebug')
  addDebugMessageSpy = jest.spyOn(SystemState.prototype, 'addDebugMessage')
  hideProgressSpy = jest.spyOn(SystemState.prototype, 'hideProgress')
  addEventListenerMock = jest.fn()
  csInterface.getThemeInformation.mockReturnValue({
    baseFontsize: 10,
    baseFontFamily: 'Adobe Clean',
    systemHighlightColor: '#FFFFFF',
    appBarBackgroundColor: '#FFFFFF',
    panelBackgroundColor: '#FFFFFF'
  })
  window.addEventListener = addEventListenerMock
  systemState = new SystemState()
})

afterEach(() => {
  jest.resetAllMocks()
  window.addEventListener = () => {}
})

it('renders properly', () => {
  const tree = renderer
    .create(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'}>
      <p>foobar</p></SystemContainer>)
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('filters errors when they appear', () => {
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  const errorCallback = addEventListenerMock.mock.calls[0][1]
  errorCallback({ data: { foo: 'bar' } })
  errorCallback({ message: 'foobar' })
  errorCallback({ stack: 'foobartwo' })
  errorCallback({ bleh: 'bab' })
  errorCallback({
    error: {
      stack: 'stackone',
      message: 'foobarthree'
    }
  })
  errorCallback({
    reason: {
      stack: 'stacktwo'
    }
  })
  expect(setErrorMessageSpy.mock.calls[0]).to.deep.equal([
    JSON.stringify({ foo: 'bar' }),
    { data: { foo: 'bar' } }
  ])
  expect(setErrorMessageSpy.mock.calls[1][0]).to.equal('foobar')
  expect(setErrorMessageSpy.mock.calls[2][0]).to.equal('foobartwo')
  expect(setErrorMessageSpy.mock.calls[3][0]).to.equal(JSON.stringify({ bleh: 'bab' }))
  expect(setErrorMessageSpy.mock.calls[4][0]).to.equal('stackone')
  expect(setErrorMessageSpy.mock.calls[5][0]).to.equal('stacktwo')
  expect(setErrorMessageSpy.mock.calls.length).to.equal(6)
})

it('forwards the onReportClicked prop to ErrorOverlay', () => {
  const callback = () => false
  const wrapper = shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'}
    onReportClicked={callback} debugEvent={'foo.debug'} />)
  expect(wrapper.find(ErrorOverlay).first().prop('onReportClicked')).to.equal(callback)
})

it('hides progress when an error occurs', () => {
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  const errorCallback = addEventListenerMock.mock.calls[0][1]
  errorCallback({ message: 'foo' })
  expect(hideProgressSpy.mock.calls).to.have.length(1)
})

it('shows a confirmation when the error is about allowing scripts to access network', () => {
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  const errorCallback = addEventListenerMock.mock.calls[0][1]
  errorCallback({ message: 'bleh Allow Scripts to Write Files and Access Network bleh' })
  expect(showConfirmationSpy.mock.calls).to.have.length(1)
  expect(showConfirmationSpy.mock.calls[0][0]).to.be.a('string')
})

it('shows debug when configured and an error occurs', () => {
  systemState.debugModeEnabled = true
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  const errorCallback = addEventListenerMock.mock.calls[0][1]
  errorCallback({ message: 'poo' })
  expect(showDebugSpy.mock.calls).to.have.length(1)
})

it('does not show debug when configured and an error occurs', () => {
  systemState.debugModeEnabled = false
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  const errorCallback = addEventListenerMock.mock.calls[0][1]
  errorCallback({ message: 'poo' })
  expect(showDebugSpy.mock.calls).to.have.length(0)
})

it('filters an error with the custom callback properly', () => {
  const filterEvent = (error, event) => {
    expect(error).to.equal('foobar')
    expect(event).to.deep.equal({ message: 'foobar' })
    return false
  }
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'}
    filterErrorEvent={filterEvent} />)
  const errorCallback = addEventListenerMock.mock.calls[0][1]
  errorCallback({ message: 'foobar' })
  expect(setErrorMessageSpy.mock.calls).to.have.length(0)
})

it('registers the error handler with CSInterface', () => {
  csInterface.addEventListener.mockReturnValueOnce(null)
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  expect(csInterface.addEventListener.mock.calls[0][0]).to.equal('foo.error')
  expect(csInterface.addEventListener.mock.calls[0][1]).to.be.a('function')
})

it('registers the debug handler with CSInterface', () => {
  csInterface.addEventListener.mockReturnValueOnce(null)
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  expect(csInterface.addEventListener.mock.calls[1][0]).to.equal('foo.debug')
  expect(csInterface.addEventListener.mock.calls[1][1]).to.be.a('function')
})

it('registers the error handler with unhandledrejection', () => {
  shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'} />)
  expect(addEventListenerMock.mock.calls[0][0]).to.equal('unhandledrejection')
  expect(addEventListenerMock.mock.calls[0][1]).to.be.a('function')
})

it('re-registers the new error handler with CSInterface upon change', () => {
  csInterface.addEventListener.mockReturnValue(null)
  const wrapper = shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'}
    debugEvent={'foo.debug'} />)
  wrapper.setProps({ errorEvent: 'foo.error.two' })
  expect(csInterface.addEventListener.mock.calls[0][0]).to.equal('foo.error')
  expect(csInterface.addEventListener.mock.calls[0][1]).to.be.a('function')
  expect(csInterface.addEventListener.mock.calls[2][0]).to.equal('foo.error.two')
  expect(csInterface.addEventListener.mock.calls[2][1]).to.be.a('function')
})

it('re-registers the new debug handler with CSInterface upon change', () => {
  csInterface.addEventListener.mockReturnValue(null)
  const wrapper = shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'}
    debugEvent={'foo.debug'} />)
  wrapper.setProps({ debugEvent: 'foo.debug.two' })
  expect(csInterface.addEventListener.mock.calls[1][0]).to.equal('foo.debug')
  expect(csInterface.addEventListener.mock.calls[1][1]).to.be.a('function')
  expect(csInterface.addEventListener.mock.calls[2][0]).to.equal('foo.debug.two')
  expect(csInterface.addEventListener.mock.calls[2][1]).to.be.a('function')
})

it('merges the theme', () => {
  const wrapper = shallow(<SystemContainer systemState={systemState} errorEvent={'foo.error'} debugEvent={'foo.debug'}
    theme={{foo: 'bar'}}/>)
  expect(wrapper.find(ThemeProvider).first()).to.have.prop('theme').deep.equal({
    ...(getDefaultTheme()),
    foo: 'bar'
  })
})
