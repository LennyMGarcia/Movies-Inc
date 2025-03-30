import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Portal } from "react-native-paper";

interface NotificationSnackbarProps {
  message: string;
  color?: string;
  visible: boolean;
  onDismiss: () => void;
}

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  message,
  color = "green",
  visible,
  onDismiss,
}) => {
  return (
    <Portal>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={{
          label: "Undo",
          color: "#FFFFFF",
        }}
        style={[styles.snackbar, { backgroundColor: color }]}
      >
        {message}
      </Snackbar>
    </Portal>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    borderRadius: 5,
  },
});

export default NotificationSnackbar;

