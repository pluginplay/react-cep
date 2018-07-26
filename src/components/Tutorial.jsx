import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import PropTypes from 'prop-types'

class Tutorial extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentStep: 0 }
    this.onNextStepClickedBound = this.onNextStepClicked.bind(this)
    this.onPreviousStepClickedBound = this.onPreviousStepClicked.bind(this)
    this.onFinalButtonClickedBound = this.onFinalButtonClicked.bind(this)
  }

  get _currentStep () { return this.props.steps[this.state.currentStep] }
  get _shouldShowNext () { return this.state.currentStep < this.props.steps.length - 1 }
  get _shouldShowFinal () { return this.state.currentStep === this.props.steps.length - 1 }
  get _shouldShowPrevious () { return this.state.currentStep > 0 }

  onFinalButtonClicked () {
    if (this.props.onFinalButtonClicked) {
      this.props.onFinalButtonClicked()
    }
  }

  onNextStepClicked () {
    this.setState({ currentStep: this.state.currentStep + 1 })
  }

  onPreviousStepClicked () {
    this.setState({ currentStep: this.state.currentStep - 1 })
  }

  renderFinalButton () {
    if (this._shouldShowFinal) {
      return (
        <NextButton className={'next-button final-button'} onClick={this.onFinalButtonClickedBound}>
          {this.props.finalButtonText}
        </NextButton>
      )
    } else return null
  }

  renderNextButton (text) {
    if (this._shouldShowNext) {
      return (
        <NextButton className={'next-button'} onClick={this.onNextStepClickedBound}>{text}</NextButton>
      )
    } else return null
  }

  renderPreviousButton () {
    if (this._shouldShowPrevious) {
      return (
        <PreviousButton onClick={this.onPreviousStepClickedBound} className={'previous-button'} />
      )
    } else return null
  }

  render() {
    return (
      <Flex full justifyCenter className={this.props.className}>
        <div className={'side image-side'}>
          <Flex full center className={'image-container'}>
            <img src={this._currentStep.image} />
          </Flex>
        </div>
        <div className={'side copy-side'}>
          <Flex full column justifyCenter>
            <h2>{this._currentStep.title}</h2>
            {this._currentStep.description()}
            <Flex alignCenter>
              {this.renderPreviousButton()}
              {this.renderNextButton(this._currentStep.nextButton)}
              {this.renderFinalButton()}
            </Flex>
          </Flex>
        </div>
      </Flex>
    )
  }
}

Tutorial.propTypes = {
  finalButtonText: PropTypes.string.isRequired,
  onFinalButtonClicked: PropTypes.func,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default styled(Tutorial)`
  flex-grow: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  .side {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    &.image-side {
      background: ${props => props.theme.background.dark};
      .image-container {
        padding: 15px;
        box-sizing: border-box;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &.copy-side {
      padding: 30px;
    }
  }
  .previous-button {
    margin-right: auto;
    margin-left: -8px;
  }
  .next-button {
    margin-right: 0;
  }
  .final-button {
    font-weight: bold;
    font-size: 14px;
    span {
      margin-right: 10px;
    }
    img {
      height: 14px;
    }
  }
  h2 { 
    margin: 0;
  }
  a {
    color: white;
  }
`
