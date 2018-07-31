import React from 'react'
import * as csInterface from 'cep-lib/csinterface'
import { ThemeProvider } from 'styled-components'
import { observer } from 'mobx-react'
import Flex from 'styled-flex-component'
import PropTypes from 'prop-types'
import SystemState from '../models/SystemState'
import Panel from './Panel'
import ProgressOverlay from './ProgressOverlay'
import ErrorOverlay from './ErrorOverlay'
import DebugOverlay from './DebugOverlay'
import ConfirmationOverlay from './ConfirmationOverlay'
import { getDefaultTheme } from '../lib/theme'

@observer
class SystemContainer extends React.Component {
  constructor (props) {
    super(props)
    const _onErrorBound = this.onError.bind(this)
    csInterface.addEventListener(props.errorEvent, _onErrorBound)
    window.addEventListener('unhandledrejection', _onErrorBound)
    window.addEventListener('error', _onErrorBound)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errorEvent !== this.props.errorEvent) {
      csInterface.addEventListener(nextProps.errorEvent, this.onError.bind(this))
    }
  }

  onError (event) {
    this.props.systemState.hideProgress()
    let error = null
    if (event.error && event.error.stack) {
      event = event.error
    }
    if (event.data) {
      error = JSON.stringify(event.data)
    } else if (event.reason && event.reason.stack) {
      error = event.reason.stack
    } else if (event.stack) {
      error = event.stack
    } else if (event.message) {
      error = event.message
    } else {
      error = JSON.stringify(event)
    }
    if (error.indexOf('Allow Scripts to Write Files and Access Network') !== -1) {
      this.props.systemState.showConfirmation(`
        Uh oh! Since this plugin writes files to the disk, you'll need to make sure to
        enable the "Allow Scripts to Write Files and Access Network" setting inside
        General preferences (Preferences > General). Once you do that, try the action
        again.
      `.trim())
      return
    }
    if (this.props.filterErrorEvent && this.props.filterErrorEvent(error, event) === false) {
      return
    }
    this.props.systemState.setErrorMessage(error.replace(/\\n/g, "\n"), event)
    if (this.props.systemState.debugModeEnabled) {
      this.props.systemState.showDebug()
    }
  }

  render () {
    const theme = Object.assign(getDefaultTheme(), this.props.theme)
    return (
      <ThemeProvider theme={theme}>
        <Panel className={this.props.className}>
          <DebugOverlay systemState={this.props.systemState} />
          <ErrorOverlay systemState={this.props.systemState} />
          <ProgressOverlay systemState={this.props.systemState} />
          <ConfirmationOverlay systemState={this.props.systemState} />
          <Flex full column>
            {this.props.children}
          </Flex>
        </Panel>
      </ThemeProvider>
    )
  }
}

SystemContainer.propTypes = {
  systemState: PropTypes.instanceOf(SystemState).isRequired,
  filterErrorEvent: PropTypes.func,
  errorEvent: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
}

SystemContainer.defaultProps = {
  theme: {}
}

export default SystemContainer
