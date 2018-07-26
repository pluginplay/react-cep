import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

class SuffixInput extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <Input {...omit(this.props, ['className'])} />
        <span>{this.props.suffix}</span>
      </div>
    )
  }
}

SuffixInput.propTypes = {
  suffix: PropTypes.string.isRequired
}

export default styled(SuffixInput)`
  border: solid 1px ${props => props.theme.background.light};
  background: ${props => props.theme.background.dark};
  input {
    border: none;
    display: inline-block;
  }
  > span {
    padding: 4px 6px 4px 0;
    color: ${props => props.theme.background.lighter};
  }
`
