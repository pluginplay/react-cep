import React from 'react'
import styled from 'styled-components'

class Panel extends React.Component {
  render () {
    return (
      <div id={'panel'} className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

export default styled(Panel)`
  background: ${props => props.theme.ae.panelBackgroundColor};
  color: white;
  font-family: "${props => props.theme.ae.baseFontFamily}", "Segoe UI", "San Francisco", sans-serif;
  font-size: ${props => props.theme.ae.baseFontSize}pt;
  position: relative;
`
