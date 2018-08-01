import styled from 'styled-components'
import React from 'react'
import omit from 'lodash/omit'

class Checkbox extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <input type={'checkbox'} {...omit(this.props, ['className'])} />
        <span />
      </div>
    )
  }
}

export default styled(Checkbox)`
  width: 16px;
  height: 16px;
  position: relative;
  outline: none;
  input[type=checkbox] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.background.dark};
    border: solid 1px ${props => props.theme.background.light};
    transition: border-color 0.1s ease-in-out;
    &:before {
      display: block;
      content: ' ';
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      bottom: 4px;
      transform: scale(0);
      transition: transform 0.1s ease-in-out;
      background: ${props => props.theme.ae.systemHighlightColor};
    }
  }
  &:hover span, input[type=checkbox]:focus + span {
    border-color: ${props => props.theme.background.lighter};
  }
  input[type=checkbox]:checked + span:before { transform: scale(1); }
  input[type=checkbox]:focus + span:before, &:hover span:before { transform: scale(0.5); }
  &:hover input[type=checkbox]:checked + span:before, input[type=checkbox]:focus:checked + span:before { transform: scale(1.2); }
`
