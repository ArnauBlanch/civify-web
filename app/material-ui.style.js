import { getMuiTheme } from 'material-ui/styles';

const muiTheme = getMuiTheme({
  fontFamily: 'Nunito, sans-serif',
  palette: {
    primary1Color: '#27ae60',
    primary2Color: '#27ae60',
    primary3Color: '#27ae60',
    accent1Color: '#ffffff',
    alternateTextColor: '#ffffff',
  },
  appBar: {
    height: 50,
  },
});

export default muiTheme;
