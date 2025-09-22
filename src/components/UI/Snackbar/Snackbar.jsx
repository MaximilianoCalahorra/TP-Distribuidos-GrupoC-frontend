import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function GenericSnackbar({ status, message, visibility }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (visibility) {
      setOpen(true);
    }
  }, [visibility]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      autoHideDuration={2500}
    >
      <Alert
        severity={status === "success" ? "success" : "error"}
        variant="filled"
        sx={{backgroundColor: status === "success" ? "#008000" : "#8B0000", fontWeight:"bold"}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

GenericSnackbar.propTypes = {
  status: PropTypes.oneOf(["success", "error"]).isRequired,
  message: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default GenericSnackbar;
