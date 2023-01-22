import { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { GlobalStyles } from '@art-nx/ui';
import { Poppins } from '@next/font/google';

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
};

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <main className={`main ${poppins.className}`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
