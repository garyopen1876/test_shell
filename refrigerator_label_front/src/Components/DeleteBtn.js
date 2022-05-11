import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

const theme2 = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
    White: {
      main: "#ffff",
    },
  },
});

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setBtnLoading(true);
    await props.handleDelete();
    setOpen(false);
    setBtnLoading(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme2}>
        <Button
          onClick={handleClickOpen}
          startIcon={<DeleteIcon color="White" />}
          color="Button"
          variant="contained"
          disableElevation
        >
          <Typography color="white" variant="h7">
            刪除物品
          </Typography>
        </Button>
      </ThemeProvider>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="Diacontent">
          <div className="DTittle">
            <DialogTitle id="responsive-dialog-title">
              <Typography variant="boby2" sx={{ fontWeight: "700" }}>
                確認刪除所選項目？
              </Typography>
            </DialogTitle>
          </div>
          <DialogActions>
            <div className="BtnGroup">
              <ThemeProvider theme={theme2}>
                <div className="BtnOK">
                  <LoadingButton
                    autoFocus
                    onClick={handleDelete}
                    loading={btnLoading}
                    variant="contained"
                    color="Button"
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}
                  >
                    <Typography color="white">確認</Typography>
                  </LoadingButton>
                </div>
                <div className="BtnNo">
                  <Button
                    onClick={handleClose}
                    autoFocus
                    variant="outlined"
                    color="Button"
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}
                  >
                    取消
                  </Button>
                </div>
              </ThemeProvider>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
