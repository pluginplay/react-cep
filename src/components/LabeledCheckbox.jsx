import React from 'react'
import Checkbox from './Checkbox'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

class LabeledCheckbox extends React.Component {
  render () {
    return (
      <label className={this.props.className}>
        <Checkbox {...omit(this.props, ['className'])} />
        <span>{this.props.label}</span>
      </label>
    )
  }
}

LabeledCheckbox.propTypes = {
  label: PropTypes.string
}

export default styled(LabeledCheckbox)`
  display: block;
  margin: 10px 0;
  &:first-child { margin-top: 0; }
  > span, div {
    display: inline-block;
    vertical-align: middle;
  }
  > span {
    margin-left: 7px;
  }
`
