import React from 'react'
import SystemState from '../models/SystemState'
import ProgressBar from './ProgressBar'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Overlay from './Overlay'

@observer
class ProgressOverlay extends React.Component {
  render () {
    const visible = this.props.systemState.showProgress
    let label = this.props.systemState.progressLabel
    if (this.props.systemState.showProgressComplete) {
      label = 'Complete!'
    }
    let labelSpan = (<span>{label}</span>)
    return (
      <Overlay visible={visible} center column>
        <ProgressBar percentage={this.props.systemState.progress} isComplete={this.props.systemState.showProgressComplete} />
        {labelSpan}
      </Overlay>
    )
  }
}

ProgressOverlay.propTypes = {
  systemState: PropTypes.instanceOf(SystemState)
}

export default ProgressOverlay
