import React from 'react'
import { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'

class MonospaceContent extends React.Component {

  onClick (e) {
    e.preventDefault()
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(e.target)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  render () {
    return (
      <FlexItem {...this.props} onClick={this.onClick}>
        {this.props.children}
      </FlexItem>
    )
  }

}

export default styled(MonospaceContent)`
  background: ${props => props.theme.background.darker};
  border-radius: 2px;
  padding: 5px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  font-family: monospace;
  overflow: auto;
  text-align: left;
`
