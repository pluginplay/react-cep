import * as csInterface from 'cep-lib/csinterface'
import { lighten, darken } from 'polished'

export const getDefaultTheme = () => {
  const ae = csInterface.getThemeInformation()
  ae.systemHighlightColor = '#0078d7' // We have to hard-code this because Windows gets the wrong color.
  return {
    ae,
    background: {
      lighter: lighten(0.2, ae.panelBackgroundColor),
      light: lighten(0.1, ae.panelBackgroundColor),
      dark: darken(0.05, ae.panelBackgroundColor),
      darker: darken(0.1, ae.panelBackgroundColor)
    },
    colors: {
      green: '#23EB87',
      red: '#eb093f',
      blue: ae.systemHighlightColor
    }
  }
}
