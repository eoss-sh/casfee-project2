const size = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
  desktopLarge: '2560px',
};

export const device = {
  s: `(min-width: ${size.mobile})`,
  m: `(min-width: ${size.tablet})`,
  l: `(min-width: ${size.laptop})`,
  xl: `(min-width: ${size.desktop})`,
  xxl: `(min-width: ${size.desktopLarge})`,
};

