import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({
  message,
  vertical,
  horizontal,
  autoHideDuration,
  className,
  width,
  severity,
}) {
  const [errorMessage, setErrorMessage] = useState({
    open: false,
  });
  const { open } = errorMessage;

  const handleError = () => {
    setErrorMessage({ open: true });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorMessage({ open: false });
  };

  useEffect(() => {
    if (message) {
      handleError();
    }
  }, [message]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        open={open}
        message={message}
        autoHideDuration={autoHideDuration}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert className={className} sx={{ width: width }} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
