
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#415A77', 
    accent: '#778DA9',  
    background: '#0D1B2A',  
    surface: '#1B263B', 
    text: '#E0E1DD', 
    placeholder: '#E0E1DD',  
    notification: '#FF5722',  
  },
  roundness: 4,  
};

export { theme };
