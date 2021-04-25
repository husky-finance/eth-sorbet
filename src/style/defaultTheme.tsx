import './main.css'

import purple from '@material-ui/core/colors/purple'

import { createMuiTheme } from '@material-ui/core'

export const defaultTheme = createMuiTheme({
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
      main: purple[600]
    }
  }
})
