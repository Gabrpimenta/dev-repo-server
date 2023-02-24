import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../../components/Navbar';

const Main = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
};

export default Main;
