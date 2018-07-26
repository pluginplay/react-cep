import React from 'react'
import Button from './Button'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Flex from 'styled-flex-component'
import arrowRight from '../assets/icons/arrow-right.svg'

class NextButton extends React.Component {
  render () {
    return (
      <Button onClick={this.props.onClick} className={this.props.className}>
        <Flex full alignCenter>
          <span>{this.props.children}</span>
          <img src={arrowRight} alt={'Next'} />
        </Flex>
      </Button>
    )
  }
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default styled(NextButton)`
  background: ${props => props.theme.ae.systemHighlightColor};
  border: none;
  span {
    margin-right: 5px;
  }
  img {
    height: 12px;
    margin-left: auto;
  }
  &:hover, &:active, &:focus {
    background: ${props => props.theme.ae.systemHighlightColor};
  }
  &:hover {
    background: ${props => props.theme.background.darker};
  }
`
