import React from 'react'
import { getDefaultTheme } from '../lib/theme'
import { ThemeProvider } from 'styled-components'

export const withTheme = (component) => {
  return (
    <ThemeProvider theme={getDefaultTheme()}>
      {component}
    </ThemeProvider>
  )
}
