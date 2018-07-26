import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import SystemState from '../models/SystemState'
import Overlay from './Overlay'
import ColorHeader from './ColorHeader'
import OverlayContent from './OverlayContent'
import MonospaceContent from './MonospaceContent'

@observer
class DebugOverlay extends React.Component {
  constructor (props) {
    super(props)
    this._onCloseClickedBound = this.onCloseClicked.bind(this)
  }

  onCloseClicked () {
    this.props.systemState.clearDebug()
  }

  render () {
    return (
      <Overlay visible={this.props.systemState.showDebugOverlay} column full>
        <ColorHeader color={'blue'}>
          <span>Debug Information</span>
          <a href={'#'} onClick={this._onCloseClickedBound}>Close</a>
        </ColorHeader>
        <OverlayContent full column>
          <p>Here is the debug information you asked for. Please send this to the plugin maintainers if
            they ask for it.</p>
          <MonospaceContent grow={1}>{this.props.systemState.debugMessage}</MonospaceContent>
        </OverlayContent>
      </Overlay>
    )
  }
}

DebugOverlay.propTypes = {
  systemState: PropTypes.instanceOf(SystemState).isRequired
}

export default DebugOverlay
