import '../index.css'

import purple from '@material-ui/core/colors/purple'

import { createMuiTheme } from '@material-ui/core'

export const light = createMuiTheme({
  typography: {
    fontFamily: [
      '"Titillium Web", sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: purple[400]
    }
  }
})

export const dark = createMuiTheme({
  ...light,
  palette: {
    type: 'dark',
    primary: {
      main: purple[200]
    },
    text: {
      primary: '#fff'
    }
  }
})

export const darkWithCustomPrimary = (color: string) => {
  return createMuiTheme({
    ...dark,
    palette: {
      type: 'dark',
      primary: {
        main: color
      }
    }
  })
}

export const lightWithCustomPrimary = (color: string) => {
  return createMuiTheme({
    ...light,
    palette: {
      primary: {
        main: color
      }
    }
  })
}
