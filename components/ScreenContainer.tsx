import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: object;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style }) => {
  const Container = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <Container style={[styles.container, style]}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenContainer;
