import React from 'react'
import Button from './Button'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

class IconButtonComponent extends React.Component {
  static propTypes = {
    alt: PropTypes.string,
    icon: PropTypes.string,
    active: PropTypes.bool
  }

  render () {
    return (
      <Button {...omit(this.props, Object.keys(IconButtonComponent.propTypes))} title={this.props.alt}>
        <img src={this.props.icon} alt={this.props.alt} />
      </Button>
    )
  }
}

export default styled(IconButtonComponent)`
  margin: 0;
  min-width: 0;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: center;
  ${props => props.active ? `background: ${props.theme.ae.systemHighlightColor} !important;` : ''}
  img { max-height: 12px; max-width: 17px; }
  @media (max-width: 320px) {
    padding: 4px;
    img { max-height: 10px; max-width: 15px; }
  }
`
