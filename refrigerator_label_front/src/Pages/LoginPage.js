import * as React from "react";
import axios from "../Axios.config";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../Pictures/monologo.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadingScreen from "react-loading-screen";
import { useEffect } from "react";
import { TokenContext } from "../App.js";
import "../App.css";

function Login() {
  let navigate = useNavigate();

  const theme = createTheme({
    palette: {
      Button: {
        main: "#363F4E",
      },
    },
  });

  const { setTokenContext } = React.useContext(TokenContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState({
    password: "",
    showPassword: false,
  });
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [AlertText, setAlertText] = React.useState("");
  const [inputErrorA, setInputErrorA] = React.useState(false);
  const [inputErrorP, setInputErrorP] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (prop) => (event) => {
    setPassword({
      ...password,
      [prop]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onHandleLogin = async (event) => {
    event.preventDefault();
    if (username === "" && password.password === "") {
      setAlertText("請輸入帳號密碼!");
      setInputErrorA(true);
      setInputErrorP(true);
      setHidden(false);
      process.exit();
    } else if (username === "") {
      setAlertText("請輸入帳號!");
      setInputErrorA(true);
      setInputErrorP(false);
      setHidden(false);
      process.exit();
    } else if (password.password === "") {
      setAlertText("請輸入密碼!");
      setInputErrorA(false);
      setInputErrorP(true);
      setHidden(false);
      process.exit();
    } else {
      setInputErrorA(false);
      setInputErrorP(false);
      setHidden(true);
    }
    setBtnLoading(true);
    await axios
      .post("api/login", {
        username: username,
        password: password.password,
      })
      .then((response) => {
        const token = response["data"]["token"];
        localStorage.setItem("login_token", token);
        setTokenContext(token);
        navigate("/ManagementPage");
      })
      .catch((error) => {
        console.log(error.response);
        setAlertText(error.response.data["message"]);
        setInputErrorA(true);
        setInputErrorP(true);
        setHidden(false);
        setBtnLoading(false);
      });
    setBtnLoading(false);
  };

  const [isLoading, setisLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  }, []);

  return (
    <div className="Login">
      {isLoading ? (
        <LoadingScreen
          loading={true}
          bgColor="#363f4e"
          textColor="#ffff"
          text="冰箱物品管理系統"
          logoSrc={Logo}
        />
      ) : (
        <ThemeProvider theme={theme}>
          <Paper
            className="login"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="SigninTittle">
              <Typography component="h1" variant="h4">
                Sign in
              </Typography>
            </div>
            {!hidden ? (
              <Alert severity="error" className="Alert" show="false">
                <Typography
                  color="black"
                  variant="body2"
                  sx={{ fontWeight: 700, width: 420, height: 2 }}
                >
                  {AlertText}
                </Typography>
              </Alert>
            ) : null}
            <Box component="form" onSubmit={onHandleLogin} noValidate>
              <div className="Account">
                <Typography>帳號 Username or Email</Typography>
                <OutlinedInput
                  error={inputErrorA}
                  fullWidth
                  required
                  type="string"
                  id="username"
                  placeholder="user@example.com"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={onChangeUsername}
                  sx={{
                    marginTop: 1,
                  }}
                />
              </div>
              <div className="Password">
                <FormControl sx={{ width: "480px" }} variant="outlined">
                  <Typography>密碼 Password</Typography>
                  <OutlinedInput
                    sx={{
                      marginTop: 1,
                    }}
                    placeholder="password"
                    id="password"
                    error={inputErrorP}
                    type={password.showPassword ? "text" : "password"}
                    value={password.password}
                    onSubmit={onHandleLogin}
                    onChange={onChangePassword("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {password.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="Keeplogin">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="保持登入"
                />
              </div>
              <LoadingButton
                loading={btnLoading}
                type="submit"
                variant="contained"
                className="ButtonLogin"
                color="Button"
                disableElevation
              >
                <Typography variant="h5" color="white" fontWeight={540}>
                  立即登入
                </Typography>
              </LoadingButton>
            </Box>
          </Paper>
        </ThemeProvider>
      )}
    </div>
  );
}

export default Login;
