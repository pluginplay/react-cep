import { expect } from '../setup'
import SystemState from '../../src/components/SystemState'

let systemState = null
beforeEach(() => {
  systemState = new SystemState()
})

it('sets some defaults', () => {
  expect(systemState.progress).to.equal(0)
})

describe('#setProgress()', () => {
  beforeEach(() => {
    systemState.showProgressComplete = true
    systemState.setProgress(10, 'test label')
  })
  it('sets showProgressComplete', () => { expect(systemState.showProgressComplete).to.equal(false) })
  it('sets showProgress', () => { expect(systemState.showProgress).to.equal(true) })
  it('sets progressLabel', () => { expect(systemState.progressLabel).to.equal('test label') })
  it('sets progress', () => { expect(systemState.progress).to.equal(10) })
})

describe('#progressComplete()', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    systemState.setProgress(10, 'test label')
    systemState.progressComplete()
  })
  it('sets progress', () => { expect(systemState.progress).to.equal(100) })
  it('sets showProgressComplete', () => { expect(systemState.showProgressComplete).to.equal(true) })
  it('waits and then hides progress', () => {
    expect(setTimeout.mock.calls).to.have.length(1)
    expect(setTimeout.mock.calls[0][0]).to.be.a('function')
    expect(setTimeout.mock.calls[0][1]).to.equal(3000)
    expect(systemState.showProgress).to.equal(true)
    jest.runAllTimers()
    expect(systemState.showProgress).to.equal(false)
  })
})

describe('#hideProgress()', () => {
  beforeEach(() => {
    systemState.showProgress = true
    systemState.hideProgress()
  })
  it('sets showProgress to false', () => { expect(systemState.showProgress).to.equal(false) })
})

describe('#setErrorMessage()', () => {
  beforeEach(() => systemState.setErrorMessage('error text', { foo: 'bar' }))
  it('sets errorMessage', () => { expect(systemState.errorMessage).to.equal('error text') })
  it('sets currentError', () => { expect(systemState.errorObject).to.deep.equal({ foo: 'bar' }) })
  it('sets showErrorDialog', () => { expect(systemState.showErrorOverlay).to.equal(true) })
})

describe('#hideErrorMessage()', () => {
  beforeEach(() => {
    systemState.setErrorMessage('error text', { foo: 'bar' })
    systemState.hideErrorMessage()
  })
  it('resets errorMessage', () => { expect(systemState.errorMessage).to.equal('') })
  it('resets currentError', () => { expect(systemState.errorObject).to.equal(null) })
  it('resets showErrorDialog', () => { expect(systemState.showErrorOverlay).to.equal(false) })
})

describe('#showDebugMessage()', () => {
  describe('when debugMessage is null', () => {
    beforeEach(() => systemState.addDebugMessage('test message'))
    it('creates a new debugMessage', () => { expect(systemState.debugMessage).to.equal('test message') })
  })
  describe('when debugMessage is not null', () => {
    beforeEach(() => {
      systemState.debugMessage = 'test message'
      systemState.addDebugMessage('foobar')
    })
    it('appends to the debugMessage', () => { expect(systemState.debugMessage).to.equal('test message\nfoobar') })
  })
})

describe('#showDebug()', () => {
  beforeEach(() => systemState.showDebug())
  it('sets showDebugOverlay', () => { expect(systemState.showDebugOverlay).to.equal(true) })
})

describe('#clearDebug()', () => {
  beforeEach(() => {
    systemState.showDebugOverlay = true
    systemState.debugMessage = 'foo'
    systemState.clearDebug()
  })
  it('resets showDebugOverlay', () => { expect(systemState.showDebugOverlay).to.equal(false) })
  it('resets debugMessage', () => { expect(systemState.debugMessage).to.equal(null) })
})

describe('#showConfirmation', () => {
  beforeEach(() => systemState.showConfirmation('foo message', () => 'foo'))
  it('sets showConfirmationOverlay', () => { expect(systemState.showConfirmationOverlay).to.equal(true) })
  it('sets confirmationMessage', () => { expect(systemState.confirmationMessage).to.equal('foo message') })
  it('sets confirmationCallback', () => { expect(systemState.confirmationCallback()).to.equal('foo') })
})

describe('#hideConfirmation', () => {
  beforeEach(() => {
    systemState.showConfirmation('foo message', () => 'foo')
    systemState.hideConfirmation()
  })
  it('resets showConfirmationOverlay', () => { expect(systemState.showConfirmationOverlay).to.equal(false) })
  it('resets confirmationMessage', () => { expect(systemState.confirmationMessage).to.equal(null) })
  it('resets confirmationCallback', () => { expect(systemState.confirmationCallback).to.equal(null) })
})
