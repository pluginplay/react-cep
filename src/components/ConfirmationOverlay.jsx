import React from 'react'
import SystemState from '../models/SystemState'
import PropTypes from 'prop-types'
import Overlay from './Overlay'
import OverlayContent from './OverlayContent'
import Button from './Button'
import { observer } from 'mobx-react'

@observer
class ConfirmationOverlay extends React.Component {
  constructor (props) {
    super(props)
    this._onCloseClickedBound = this.onCloseClicked.bind(this)
  }

  onCloseClicked () {
    if (this.props.systemState.confirmationCallback) {
      this.props.systemState.confirmationCallback()
    }
    this.props.systemState.hideConfirmation()
  }

  render () {
    const visible = this.props.systemState.showConfirmationOverlay
    const message = this.props.systemState.confirmationMessage
    return (
      <Overlay visible={visible} center column>
        <OverlayContent column>
          <div>{message}</div>
          <Button onClick={this._onCloseClickedBound}>OK</Button>
        </OverlayContent>
      </Overlay>
    )
  }
}

ConfirmationOverlay.propTypes = {
  systemState: PropTypes.instanceOf(SystemState).isRequired
}

export default ConfirmationOverlay
