import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material';
import AppBar from './AppBar';
import Drawer, { DrawerHeader } from './Drawer';

export default function Layout({ children, freeLayout }) {
  const [isDark, setIsDark] = React.useState(JSON.parse(localStorage.getItem("isDark")) || false)
  const handleThemeChange = () => setIsDark(!isDark)
  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: isDark ? "#FF6347" : "#FF4500"
      }
    },
  });

  const [open, setOpen] = React.useState(JSON.parse(localStorage.getItem("isDrawerOpen")) || false);

  React.useEffect(() => {
    localStorage.setItem("isDark", isDark);
  }, [isDark]);

  React.useEffect(() => {
    localStorage.setItem("isDrawerOpen", open);
  }, [open]);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      {
        freeLayout == true ? children : <Box sx={{
          display: 'flex'
        }}>
          <AppBar open={open} handleDrawerOpen={handleDrawerOpen} handleThemeChange={handleThemeChange} isDark={isDark} />
          <Drawer handleDrawerClose={handleDrawerClose} open={open} isDark={isDark} />
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      }

    </ThemeProvider>
  );
}