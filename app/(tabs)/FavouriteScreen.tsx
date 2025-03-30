import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import MovieList from '@/components/movies/MovieList';
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies';
import { RootState } from '@/store/movieStore';
import ScreenContainer from '@/components/ScreenContainer';
import { Try } from 'expo-router/build/views/Try';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const FavouriteScreen = () => {
  const { movies, loading } = useUpcomingMovies();
  const favoriteIds = useSelector((state: RootState) => state.favourites.ids);

  const favoriteMovies = movies.filter((movie) => favoriteIds.includes(Number(movie.id)));

  return (
    <Try catch={ErrorBoundary}>
      <ScreenContainer style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#121212" }}>
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

          {favoriteMovies.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No favorite items</Text>
            </View>
          ) : (
            <MovieList movies={favoriteMovies} loading={loading} title='Favourites Movies' />
          )}
        </View>
      </ScreenContainer>
    </Try>
  );
};

export default FavouriteScreen;

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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});
