import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

class SuffixInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputFocused: false
    }
  }

  onFocus = () => {
    this.setState({ inputFocused: true })
  }

  onBlur = () => {
    this.setState({ inputFocused: false })
  }

  render () {
    return (
      <div className={`${this.props.className} ${this.state.inputFocused ? 'focused' : ''}`}>
        <Input {...omit(this.props, ['className'])} onFocus={this.onFocus} onBlur={this.onBlur} />
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
  display: flex;
  transition: background 0.1s ease-in-out, border-color 0.1s ease-in-out;
  &.focused {
    border-color: ${props => props.theme.ae.systemHighlightColor};
    background: ${props => props.theme.background.darker};
  }
  input {
    border: none;
    display: inline-block;
  }
  > span {
    padding: 4px 6px 4px 0;
    color: ${props => props.theme.background.lighter};
  }
`
