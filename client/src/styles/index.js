import { createGlobalStyle } from 'styled-components'

export const Theme = {
    colors: {
        primary: '#000000',
        secondary: '#ffffff',
        tertiary: '#b13a8e',
    },
    fonts: {
        mainFont: '"Arial", sans-serif',
    },
    size: {
        header: {
            maxHeight: 350,
            height: 90,
        },
        footer: {
            height: 250
        },
    },
    media: {
        extraLarge: '(max-width: 1390px)',
        large: '(max-width: 985px)',
        medium: '(max-width: 720px)',
        small: '(max-width: 480px)',
    },
}

export const Styles = createGlobalStyle`
  
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Bellota Text', cursive;
  }

  body {
    background-color: ${({theme}) => theme.colors.primary};
  }
`