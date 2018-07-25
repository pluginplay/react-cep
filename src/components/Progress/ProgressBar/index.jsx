import React from 'react'
import ProgressContainer from '../ProgressContainer'
import ProgressInner from '../ProgressInner'
import PropTypes from 'prop-types'

class ProgressBar extends React.Component {

  render () {
    return (
      <ProgressContainer>
        <ProgressInner percentage={this.props.percentage} isComplete={this.props.isComplete} />
      </ProgressContainer>
    )
  }

}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired
}

export default ProgressBar
