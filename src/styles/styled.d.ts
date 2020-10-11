import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;

      background: string;
      header: string;
      headerHover: string;
      card: string;

      title: string;
      text: string;
      letter1: string;
      letter2: string;
      letter3: string;
      letter4: string;
      letter5: string;

      toastInfoColor: string;
      toastInfoBackgroundColor: string;
      toastSuccessColor: string;
      toastSuccessBackgroundColor: string;
      toastErrorColor: string;
      toastErrorBackgroundColor: string;

      windowBoxShadow: string;
      boxShadow: string;
      boxShadowHover: string;

      green: string;
      red: string;
    };
  }
}
