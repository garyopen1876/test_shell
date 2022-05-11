import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TokenContext } from "../App.js";

const theme = createTheme({
  palette: {
    white: {
      main: "rgb(255,255,255)",
    },
    Button: {
      main: "#363F4E",
    },
    Log: {
      main: "#5CB4FD",
    },
  },
});

export default function ButtonAppBar() {
  let navigate = useNavigate();

  const { setTokenContext } = React.useContext(TokenContext);

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    setTokenContext(null);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="Button">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
              color="White"
            >
              冰箱物品管理
            </Typography>
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                color="white"
                onClick={handleLogout}
                href="/"
              >
                <Typography color="White">Logout</Typography>
              </Button>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
