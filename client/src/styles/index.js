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
            maxHeight: 500,
            height: 90,
        },
        footer: {
            height: 200
        },
    },
    // media: {
    //     extraLarge: '(max-width: 1140px)',
    //     large: '(max-width: 960px)',
    //     medium: '(max-width: 720px)',
    //     small: '(max-width: 540px)',
    // },
}

export const Styles = createGlobalStyle`
  
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }

  body {
    background-color: ${({theme}) => theme.colors.secondary};
  }
`