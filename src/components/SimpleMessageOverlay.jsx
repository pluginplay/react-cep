import React from 'react'
import PropTypes from 'prop-types'
import Overlay from './Overlay'
import { observer } from 'mobx-react'
import styled from 'styled-components'

@observer
class SimpleMessageOverlay extends React.Component {
  render () {
    const visible = this.props.systemState.simpleMessageVisible
    const message = this.props.systemState.simpleMessage
    return (
      <Overlay visible={visible} className={this.props.className} center column>
        <p>{message}</p>
      </Overlay>
    )
  }
}

SimpleMessageOverlay.propTypes = {
  systemState: PropTypes.object.isRequired
}

export default styled(SimpleMessageOverlay)`
  background: none;
  transition: opacity ${props => props.visible ? '0.1s' : '0.25s'} linear, z-index 0s linear ${props => props.visible ? '' : '0.25s'};
  > p {
    padding: 10px 15px;
    background: ${props => props.theme.background.darker};
    border: solid 1px ${props => props.theme.background.light};
    box-shadow: 0 0 3px ${props => props.theme.background.dark};
    border-radius: 2px;
  }
`
