import React from 'react'
import renderer from 'react-test-renderer'
import { expect, withTheme } from '../setup'
import { getDefaultTheme } from '../../src/lib/theme'
import { shallow } from 'enzyme'
import Tutorial from '../../src/components/Tutorial'

import PreviousButton from '../../src/components/PreviousButton'
import NextButton from '../../src/components/NextButton'

let tutorial = null
beforeEach(() => {
  tutorial = [
    { title: 'Step 1', image: 'foo', nextButton: 'Step 1 Next', description: () => <p>Step 1</p> },
    { title: 'Step 2', image: 'bar', nextButton: 'Step 2 Next', description: () => <p>Step 2</p> },
    { title: 'Step 3', image: 'par', nextButton: 'Step 3 Next', description: () => <p>Step 3</p> }
  ]
})

const getWrapper = (props = {}) => {
  return shallow(<Tutorial theme={getDefaultTheme()} steps={tutorial} finalButtonText={'Final'} {...props} />).dive()
}

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<Tutorial steps={tutorial} finalButtonText={'Final'} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('shows the previous button only when there is a previous step', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(PreviousButton)).to.have.length(0)
  wrapper.setState({ currentStep: 1 })
  expect(wrapper.find(PreviousButton)).to.have.length(1)
})

it('shows the final button when we are on the final step', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(NextButton).filter('.next-button').not('.final-button')).to.have.length(1)
  expect(wrapper.find(NextButton).filter('.final-button')).to.have.length(0)
  wrapper.setState({ currentStep: 2 })
  expect(wrapper.find(NextButton).filter('.next-button').not('.final-button')).to.have.length(0)
  expect(wrapper.find(NextButton).filter('.final-button')).to.have.length(1)
})

it('shows the final button with the proper text configured', () => {
  const wrapper = getWrapper({ finalButtonText: 'final button text' }).setState({ currentStep: 2 })
  expect(wrapper.find(NextButton).filter('.final-button').first().childAt(0)).to.have.text('final button text')
})

it('shows the next button with the proper text configured', () => {
  const wrapper = getWrapper()
  expect(wrapper.find(NextButton).not('.final-button').first().childAt(0)).to.have.text('Step 1 Next')
})

it('transitions to the next step when next is clicked', () => {
  const wrapper = getWrapper()
  expect(wrapper.find('p').first()).to.have.text('Step 1')
  expect(wrapper.find('img').first()).to.have.prop('src').equal('foo')
  wrapper.find(NextButton).not('.final-button').first().simulate('click')
  expect(wrapper.find('p').first()).to.have.text('Step 2')
  expect(wrapper.find('img').first()).to.have.prop('src').equal('bar')
})

it('transitions to the previous step when previous is clicked', () => {
  const wrapper = getWrapper().setState({ currentStep: 1 })
  expect(wrapper.find('p').first()).to.have.text('Step 2')
  expect(wrapper.find('img').first()).to.have.prop('src').equal('bar')
  wrapper.find(PreviousButton).first().simulate('click')
  expect(wrapper.find('p').first()).to.have.text('Step 1')
  expect(wrapper.find('img').first()).to.have.prop('src').equal('foo')
})

it('calls onFinalButtonClicked when the final button is clicked', () => {
  const finalClicked = jest.fn()
  const wrapper = getWrapper({ onFinalButtonClicked: finalClicked }).setState({ currentStep: 2 })
  wrapper.find(NextButton).filter('.final-button').first().simulate('click')
  jestExpect(finalClicked).toHaveBeenCalledTimes(1)
})
