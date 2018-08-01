import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class LabeledInput extends React.Component {
  render () {
    return (
      <label className={this.props.className}>
        <span className={'label'}>{this.props.label}</span>
        <span className={'input'}>{this.props.children}</span>
      </label>
    )
  }
}

LabeledInput.propTypes = {
  label: PropTypes.string.isRequired
}

export default styled(LabeledInput)`
  display: inline-block;
  vertical-align: middle;
  > .label, > .input {
    display: inline-block;
  }
  > .label {
    margin-right: 5px;
  }
`
