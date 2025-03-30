import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { type ErrorBoundaryProps } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from './expo-componentes/ThemedText';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.errorContainer}>
      <MaterialIcons name="report-problem" style={{color:"white"}} size={100} color="black" />
      <ThemedText type="title" style={styles.errorText}>Oh no! Something went wrong.</ThemedText>
       <ThemedText type="subtitle" style={styles.errorMessage}>{error.message}</ThemedText>
      <TouchableOpacity style={styles.retryButton} onPress={retry}>
        <ThemedText type="defaultSemiBold" style={styles.retryText}>Try Again</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
});
