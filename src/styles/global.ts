import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: ${props => props.theme.colors.primary};
    --secondary-color: ${props => props.theme.colors.secondary};
    --title-color: ${props => props.theme.colors.title};
    --background-color: ${props => props.theme.colors.background};
    /* #312e38 */
    --header-background-color: ${props => props.theme.colors.header};
    /* #28262e */
    --card-color: ${props => props.theme.colors.card};
    /* #3e3a47 */
    --letter-color-1: ${props => props.theme.colors.letter1};
    --letter-color-2: ${props => props.theme.colors.letter2};
    --letter-color-3: ${props => props.theme.colors.letter3};
    --letter-color-4: ${props => props.theme.colors.letter4};
    --letter-color-5: ${props => props.theme.colors.letter5};
    --box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.2);
    --box-shadow-hover: -1px -1px 5px 2px rgba(0, 0, 0, 0.2);
    --box-shadow-active: 1px 1px 20px 4px rgba(150, 150, 150, 0.08);
    --window-box-shadow: 2px 2px 10px 4px rgba(255, 150, 10, 0.3);
    --red-color: #c53030;
    --input-container-color: rgb(179, 182, 178);
    --toast-info-color: ${props => props.theme.colors.toastInfoColor};
    --toast-info-background-color: ${props =>
      props.theme.colors.toastInfoBackgroundColor};
    --toast-success-color: ${props => props.theme.colors.toastSuccessColor};
    --toast-success-background-color: ${props =>
      props.theme.colors.toastSuccessBackgroundColor};
    --toast-error-color: ${props => props.theme.colors.toastErrorColor};
    --toast-error-background-color: ${props =>
      props.theme.colors.toastErrorBackgroundColor};
    --green-background-color: rgba(10, 200, 0)
    --window-box-shadow: ${props => props.theme.colors.windowBoxShadow};
    --green-icon: ${props => props.theme.colors.green};
    --red-icon: ${props => props.theme.colors.red};
  }

  /* Dark Mode */
/*
  :root {
    --primary-color: #ff9000;
    --title-color: rgb(255, 200, 55);
    --background-color: rgb(76, 82, 85);
    #312e38
    --header-background-color: rgb(45, 50, 53);
    #28262e
    --card-color: rgb(58, 62, 61);
    #3e3a47
    --letter-color-1: #FFF;
    --letter-color-2: rgb(149, 152, 158);
    --letter-color-3: rgb(179, 182, 178);
    --letter-color-4: rgb(120, 122, 125);
    --letter-color-5: rgb(20, 22, 25);
    --box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.1);
    --red-color: #c53030;
    --input-container-color: #232129;
    --toast-info-color: #3172b7;
    --toast-info-background-color: #ebf8ff;
    --toast-success-color: #2e656a;
    --toast-success-background-color: #e6fffa;
    --toast-error-color: #c53030;
    --toast-error-background-color: #fddede;
    --green-background-color: rgba(10, 200, 0)
  } */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button, link, a {
    cursor: pointer;
  }
`;
