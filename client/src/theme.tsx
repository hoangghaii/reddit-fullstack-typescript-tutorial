import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const configColor = {
  black: '#16161D',
  white: '#FFFFFF',
  orange: {
    default: '#ff4500',
    100: '#ff4500',
    50: '#ff7541',
  },
  pinkDark: '#FF0080',
  violet: '#7928CA',
};

const theme = extendTheme({
  config,
  colors: configColor,
  fonts,
  breakpoints,
});

export default theme;
