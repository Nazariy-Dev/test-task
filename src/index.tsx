
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles/index.scss"

import { createGlobalStyle, ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: "#F4E041",
    secondary: "#00BDD3",
    bgColor: "#F8F8F8",
    textColor: "#000000",
    error: "#CB3D40"
  },
  media: {
    md1: "1170px",
    md2: "1024px",
    md3: "768px",
    md4: "360px",
  },
  fontFamily: {
    main: "Nunito, sans-serif"
  }
}

const Global = createGlobalStyle`
  body {
    font-family: ${theme.fontFamily.main};
    background-color: ${theme.colors.bgColor};
  }
`
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <Global />
    <App />
  </ThemeProvider>
);