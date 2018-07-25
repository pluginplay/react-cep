import { observable, action } from 'mobx'

export default class SystemState {
  @observable progress = 0
  @observable progressLabel = 'Loading'
  @observable showProgress = false
  @observable showProgressComplete = false
  @observable errorMessage = null
  @observable errorObject = null
  @observable showErrorOverlay = false
  @observable debugMessage = null
  @observable showDebugOverlay = null
  @observable confirmationMessage = null
  @observable confirmationCallback = null
  @observable showConfirmationOverlay = false

  @action setProgress (progress, label, showProgress = true) {
    this.showProgressComplete = false
    this.showProgress = showProgress
    this.progressLabel = label
    this.progress = progress
  }

  @action progressComplete () {
    this.progress = 100
    this.showProgressComplete = true
    setTimeout(() => {
      this.hideProgress()
    }, 3000)
  }

  @action hideProgress () {
    this.showProgress = false
  }

  @action setErrorMessage (errorText, error) {
    this.errorMessage = errorText
    this.errorObject = error
    this.showErrorOverlay = true
  }

  @action hideErrorMessage () {
    this.errorMessage = ''
    this.errorObject = null
    this.showErrorOverlay = false
  }

  @action addDebugMessage (message) {
    console.log(`[DEBUG] ${message}`)
    if (this.debugMessage === null) {
      this.debugMessage = message
    } else {
      this.debugMessage += `\n${message}`
    }
  }

  @action showDebug () {
    this.showDebugOverlay = true
  }

  @action clearDebug () {
    this.showDebugOverlay = false
    this.debugMessage = null
  }

  @action showConfirmation (message, callback) {
    this.showConfirmationOverlay = true
    this.confirmationMessage = message
    this.confirmationCallback = callback
  }

  @action hideConfirmation () {
    this.showConfirmationOverlay = false
    this.confirmationMessage = null
    this.confirmationCallback = null
  }
}
