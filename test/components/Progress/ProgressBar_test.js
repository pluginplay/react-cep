import React from 'react'
import ProgressBar from '../../../src/components/Progress/ProgressBar'
import renderer from 'react-test-renderer'
import { withTheme } from '../../setup'

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<ProgressBar percentage={20} isComplete={false} />))
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly when complete', () => {
  const tree = renderer
    .create(withTheme(<ProgressBar percentage={20} isComplete={true} />))
    .toJSON()
  expect(tree).toMatchSnapshot()
})
