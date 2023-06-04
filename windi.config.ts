import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#33CCCC',
      },
    },
    borderColor: theme => ({
      ...theme('colors'),
      primary: '#33CCCC',
    }),
  },
  plugins: [],
});
