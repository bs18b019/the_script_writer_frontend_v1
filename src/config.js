// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '/dashboard/default',
  fontFamily: `'Tableau-Medium'`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
// export const SERVER_URL = ''
export const SERVER_URL = process.env.REACT_APP_NODE_ENV === 'LOCAL' ? 'http://localhost:5214' : '';

