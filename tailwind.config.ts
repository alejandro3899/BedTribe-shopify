import defaultTheme from 'tailwindcss/defaultTheme';
import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '50%': '50%',
    },
    extend: {
      colors: {
        cream: '#F6F5F2',
        sage: '#D1CFA4 ',
        noir: '#1D0505',
        zap: '#282828',
        dusk: '#888B8E',
        night: '#353535',
        'product-card': '#F0F0F0',
      },
      fontSize: {
        '11': ['11px', '1.0'],
        '16': ['16px', '1.2'],
        '20': ['20px', '1.2'],
        '24': ['24px', '1.1'],
        '28': ['28px', '1.2'],
        '32': ['32px', '1.0'],
        '38': ['36px', '1.0'],
        '40': ['40px', '1.1'],
        '46': ['48px', '1.0'],
        '48': ['48px', '1.1'],
        '60': ['60px', '1.0'],
        '80': ['80px', '1.0'],
        '100': ['100px', '1.0'],
      },
      spacing: {
        '13': '52px',
      },
      fontFamily: {
        sans: ['Owners', ...defaultTheme.fontFamily.sans],
        mono: ['PPTelegraf', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
} satisfies Config;
