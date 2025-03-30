import { ErrorBoundary } from '@/components/ErrorBoundary';
import MovieList from '@/components/movies/MovieList';
import ScreenContainer from '@/components/ScreenContainer';
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies';
import { Try } from 'expo-router/build/views/Try';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';

const HomeScreen = () => {
  const { movies, loading } = useUpcomingMovies();  
  return (
    <Try catch={ErrorBoundary}>
    <ScreenContainer  style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
        <MovieList movies={movies}  loading={loading} title='Release Movies'/>
      </View>
      </ScreenContainer>
    </Try>
  );
};

export default HomeScreen;

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
    color: '#33f3ff',
  },
});