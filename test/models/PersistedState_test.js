import { expect } from '../setup'
import PersistedState from '../../src/components/PersistedState'

it('creates a persisted state', () => {
  const persistedState = new PersistedState()
  expect(persistedState.state.configurationVersion).to.equal(0)
})

it('creates a persisted state with additional default state options', () => {
  const persistedState = new PersistedState({}, {
    foo: 'bar'
  })
  expect(persistedState.state.configurationVersion).to.equal(0)
  expect(persistedState.state.foo).to.equal('bar')
})

it('creates a persisted state with an overridden configuration version', () => {
  class SubPersistedState extends PersistedState {
    constructor (defaultState = {}) {
      super({ configurationVersion: 1 }, defaultState)
    }
  }
  const persistedState = new SubPersistedState()
  expect(persistedState.state.configurationVersion).to.equal(1)
})

it('resets the configuration with an old configuration version', () => {
  localStorage.setItem('plugin.persistedState', JSON.stringify({ configurationVersion: 0, foo: 'bar' }))
  class SubPersistedState extends PersistedState {
    constructor (defaultState = {}) {
      super({ configurationVersion: 1, delay: 0 }, defaultState)
    }
  }
  const persistedState = new SubPersistedState({
    foo: 'two'
  })
  expect(persistedState.state.configurationVersion).to.equal(1)
  expect(persistedState.state.foo).to.equal('two')
  expect(JSON.parse(localStorage.getItem('plugin.persistedState'))).to.deep.equal({
    configurationVersion: 1,
    foo: 'two'
  })
})

it('stores under a different localStorage name', () => {
  class SubPersistedState extends PersistedState {
    constructor (defaultState = {}) {
      super({ localStorageName: 'foo-bar', delay: 0 }, defaultState)
    }
  }
  new SubPersistedState()
  expect(JSON.parse(localStorage.getItem('foo-bar'))).to.deep.equal({
    configurationVersion: 0
  })
})
