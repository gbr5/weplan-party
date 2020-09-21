import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;

      background: string;
      header: string;
      card: string;

      title: string;
      text: string;

      toastInfoColor: string;
      toastInfoBackgroundColor: string;
      toastSuccessColor: string;
      toastSuccessBackgroundColor: string;
      toastErrorColor: string;
      toastErrorBackgroundColor: string;

      windowBoxShadow: string;

      green: string;
      red: string;
    };
  }
}
