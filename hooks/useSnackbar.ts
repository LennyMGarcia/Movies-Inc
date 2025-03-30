import { useState } from "react";

export default function useSnackbar() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("green");

  const showSnackbar = (message: string, color: string) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);
  };

  return { snackbarVisible, snackbarMessage, snackbarColor, setSnackbarVisible, showSnackbar };
}
