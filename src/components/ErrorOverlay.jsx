import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Overlay from './Overlay'
import OverlayContent from './OverlayContent'
import ColorHeader from './ColorHeader'
import MonospaceContent from './MonospaceContent'
import styled from 'styled-components'

@observer
class ErrorOverlay extends React.Component {
  constructor (props) {
    super(props)
    this._onCloseClickedBound = this.onCloseClicked.bind(this)
    this._onWhatMeanClickedBound = this.onWhatMeanClicked.bind(this)
    this._onReportClickedBound = this.onReportClicked.bind(this)
  }

  onWhatMeanClicked (e) {
    if (e) {
      e.preventDefault()
    }
    this.props.systemState.showConfirmation('When you send the developers an error report, you send very useful ' +
      'information about what went wrong that allows us to improve the plugin. The error report will contain ' +
      'your AE version, installed extensions, and what operating system you\'re running.')
  }

  onReportClicked (e) {
    if (e) {
      e.preventDefault()
    }
    if (this.props.onReportClicked) {
      this.props.onReportClicked()
    }
    this.props.systemState.hideErrorMessage()
  }

  onCloseClicked () {
    this.props.systemState.hideErrorMessage()
  }

  render () {
    return (
      <Overlay visible={this.props.systemState.showErrorOverlay} column full className={this.props.className}>
        <ColorHeader color={'red'}>
          <span>Oh dear, an error!</span>
          <a href={'#'} onClick={this._onCloseClickedBound}>Close</a>
        </ColorHeader>
        <OverlayContent full column>
          <p>
            Looks like we've run into a problem. You could help the developers out and <a
              href={'#'} className={'send-button'} onClick={this._onReportClickedBound}>send the error report.</a>
            <br /><a href={'#'} onClick={this._onWhatMeanClickedBound}>What does this mean?</a>
          </p>
          <MonospaceContent grow={1}>{this.props.systemState.errorMessage}</MonospaceContent>
        </OverlayContent>
      </Overlay>
    )
  }
}

ErrorOverlay.propTypes = {
  systemState: PropTypes.object.isRequired,
  onReportClicked: PropTypes.func
}

export default styled(ErrorOverlay)`
  .send-button {
    background: ${props => props.theme.ae.systemHighlightColor};
    padding: 1px 2px;
    color: white;
    font-weight: bold;
    white-space: nowrap;
  }
`
