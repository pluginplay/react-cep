import { localStored } from 'mobx-stored'

class PersistedState {
  static _defaultLocalState = {
    configurationVersion: 0
  }

  constructor ({
    configurationVersion = 0,
    localStorageName = 'plugin.persistedState',
    delay = 250
  } = {}, defaultState = {}) {
    this._persistedState = localStored(
      localStorageName,
      Object.assign({}, PersistedState._defaultLocalState, {
        configurationVersion
      }, defaultState),
      { delay }
    )
    if (this._persistedState.configurationVersion !== configurationVersion) {
      this._persistedState.reset()
      this._persistedState.configurationVersion = configurationVersion
    }
  }

  get state () {
    return this._persistedState
  }
}

export default PersistedState
