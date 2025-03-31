import { ErrorBoundary } from '@/components/ErrorBoundary';
import Header from '@/components/Header';
import MovieList from '@/components/movies/MovieList';
import ScreenContainer from '@/components/ScreenContainer';
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies';
import { Try } from 'expo-router/build/views/Try';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const HomeScreen = () => {
  const { movies, loading } = useUpcomingMovies();  
  return (
    <Try catch={ErrorBoundary}>
    <ScreenContainer  style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header/>
        <MovieList movies={movies}  loading={loading} title='Release Movies'/>
      </View>
      </ScreenContainer>
    </Try>
  );
};

export default HomeScreen;
