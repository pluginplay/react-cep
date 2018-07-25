import { getDefaultTheme } from '../../src/lib/theme'
import React from 'react'
import Panel from '../../src/components/Panel'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer
    .create(<Panel theme={getDefaultTheme()}><div>Foo Bar</div></Panel>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
