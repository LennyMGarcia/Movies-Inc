
import MovieList from '@/components/movies/MovieList';
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const TabTwoScreen = () => {
  const { movies, loading } = useUpcomingMovies();  
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
};

export default TabTwoScreen;

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