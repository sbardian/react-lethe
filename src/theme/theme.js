const theme = {
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    '1rem', // 0
    '1.4rem', // 1
    '1.6rem', // 2
    '1.8rem', // 3
    '2rem', // 4
    '2.2rem', // 5
    '2.4rem', // 6
    '2.8rem', // 7
    '3rem', // 8
    '4.4rem', // 9
    '0.8rem', // 10
  ],
  fontWeights: {
    body: 200,
    heading: 500,
    bold: 700,
  },
  lineHeights: [
    '20px', // 0
    '22px', // 1
    '30px', // 2
    '32px', // 3
    '36px', // 4
    '38px', // 5
    '52px', // 6
  ],
  space: [
    // Tachyons scale - could be any scale, though
    0, // 0
    '0.25rem', // 1
    '0.5rem', // 2
    '1rem', // 3
    '2rem', // 4
    '4rem', // 5
    '8rem', // 6
    '16rem', // 7
  ],
  styles: {
    root: {
      // uses the theme values provided above
      fontFamily: 'body',
      fontWeight: 'body',
    },
  },
}

export default theme
