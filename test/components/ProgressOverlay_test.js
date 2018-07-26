import React from 'react'
import { shallow } from 'enzyme'
import { expect, withTheme } from '../setup'
import ProgressOverlay from '../../src/components/ProgressOverlay'
import Overlay from '../../src/components/Overlay'
import ProgressBar from '../../src/components/ProgressBar'
import SystemState from '../../src/models/SystemState'
import renderer from 'react-test-renderer'

let systemState = null
beforeEach(() => {
  systemState = new SystemState()
  systemState.showProgress = true
  systemState.progress = 20
  systemState.progressLabel = 'loading stuff'
})

it('marks the Overlay as visible when visible', () => {
  const wrapper = shallow(<ProgressOverlay systemState={systemState} />)
  expect(wrapper.find(Overlay).first()).to.have.prop('visible').equal(true)
})

it('sets the label to progressLabel when not complete', () => {
  const wrapper = shallow(<ProgressOverlay systemState={systemState} />)
  expect(wrapper.find('span').first()).to.have.text('loading stuff')
})

it('sets the label to complete text when complete', () => {
  systemState.showProgressComplete = true
  const wrapper = shallow(<ProgressOverlay systemState={systemState} />)
  expect(wrapper.find('span').first()).to.have.text('Complete!')
})

it('sets up the ProgressBar properly', () => {
  const wrapper = shallow(<ProgressOverlay systemState={systemState} />)
  const progressBar = wrapper.find(ProgressBar).first()
  expect(progressBar).to.have.prop('percentage').equal(20)
  expect(progressBar).to.have.prop('isComplete').equal(false)
})

it('renders the proper HTML structure', () => {
  const tree = renderer
    .create(withTheme(<ProgressOverlay systemState={systemState} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})
