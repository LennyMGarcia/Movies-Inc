import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

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
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={{
          label: "Undo",
          onPress: () => {
            console.log("Undo action");
          },
          color: "#FFFFFF", 
        }}
        style={[styles.snackbar, { backgroundColor: color }]} 
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    marginBottom: 0, 
  },
  snackbar: {
    borderRadius: 5, 
  },
});

export default NotificationSnackbar;
