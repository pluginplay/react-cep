import React from 'react'
import RCSlider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'
import styled from 'styled-components'
import omit from 'lodash/omit'

class Slider extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <RCSlider {...omit(this.props, ['className'])} />
      </div>
    )
  }
}

export default styled(Slider)`
  flex-grow: 1;
  margin: 0 15px;
  .rc-slider {
    .rc-slider-rail {
      background-color: ${props => props.theme.background.dark};
      border-radius: 0;
    }
    .rc-slider-track {
      background-color: ${props => props.theme.ae.systemHighlightColor};
      border-radius: 0;
    }
    .rc-slider-handle {
      border: none;
      width: 12px;
      height: 12px;
      margin-left: -6px;
      margin-top: -4px;
      background-color: ${props => props.theme.ae.systemHighlightColor};
    }
  }
`
