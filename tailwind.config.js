/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      diary_gray: '#ececec',
      diary_green: '#64c964',
      diary_lightGreen: '#9dd772',
      diary_yellow: '#fdce17',
      diary_orange: '#fd8446',
      diary_red: '#fd565f',
      diary_white: '#ffffff',
      diary_black: '#000000',
    },
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    fontSize: {
      heading_lg: [
        '1.5rem', //24px
        {
          letterSpacing: '-0.02em',
          lineHeight: '1',
        },
      ],
      heading_md: [
        '1.125rem', //18px
        {
          letterSpacing: '0',
          lineHeight: '1.5rem', //24
        },
      ],
      heading_sm: [
        '0.875rem', //14px
        {
          letterSpacing: '0',
          lineHeight: '1.25rem', //20
        },
      ],
      heading_xs: [
        '0.75rem', //12px
        {
          letterSpacing: '0',
          lineHeight: '1',
        },
      ],
    },
  },
  plugins: [],
}