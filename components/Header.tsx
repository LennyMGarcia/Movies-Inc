import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = () => {
  return (
    <Appbar.Header>
      <Appbar.Content
        title={
          <Text style={styles.title}>
            <Text style={styles.moviesText}>Movies</Text>
            <Text style={styles.incText}> Inc</Text>
          </Text>
        }
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moviesText: {
    color: 'white',
  },
  incText: {
    color: 'blue',
  },
});

export default Header;