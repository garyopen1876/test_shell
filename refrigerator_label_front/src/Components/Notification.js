import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Notification(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const { Message } = props;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
        {Message}
      </Alert>
    </Snackbar>
  );
}
