import { withTheme } from '../setup'
import React from 'react'
import LabeledInput from '../../src/components/LabeledInput'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<LabeledInput label={'Look ima label'}><span>foo</span></LabeledInput>))
    .toJSON()
  expect(tree).toMatchSnapshot()
})
