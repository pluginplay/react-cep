import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { getDefaultTheme } from '../src/lib/theme'

chai.use(chaiAsPromised)
chai.use(chaiEnzyme())
export const expect = chai.expect

export const withTheme = (component) => {
  return (
    <ThemeProvider theme={getDefaultTheme()}>
      {component}
    </ThemeProvider>
  )
}
