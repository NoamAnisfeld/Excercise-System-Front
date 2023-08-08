import type { Preview } from '@storybook/react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

/* TODO: update import for your custom Material UI themes */
// import { lightTheme, darkTheme } from '../path/to/themes';

// Import your fontface CSS files here
// Don't have any? We recommend installing and using @fontsource/roboto
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds global styles and theme switching support.
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline,
      // Uncomment for theme switching
      // Provider: ThemeProvider,
      // themes: {
      // Provide your custom themes here
      //   light: lightTheme,
      //   dark: darkTheme,
      // },
      // defaultTheme: 'light',
    }),
  ],
};

export default preview;
