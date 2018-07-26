import React from 'react'
import Button from './Button'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Flex from 'styled-flex-component'
import arrowLeft from '../assets/icons/arrow-left.svg'

class PreviousButton extends React.Component {
  render () {
    return (
      <Button onClick={this.props.onClick} className={this.props.className}>
        <Flex full alignCenter>
          <img src={arrowLeft} alt={'Back'} />
          <span>Back</span>
        </Flex>
      </Button>
    )
  }
}

PreviousButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default styled(PreviousButton)`
  background: none;
  border: none;
  min-width: 0;
  img {
    height: 12px;
    margin-right: 5px;
  }
  &:active, &:focus {
    background: none;    
  }
`
