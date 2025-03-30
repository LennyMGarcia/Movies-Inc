import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movieInterfaces';
import MovieListSkeleton from '@/components/movies/skeleton/MovieList.skeleton';


const MovieList = ({ movies, loading, title }: { movies: Movie[], loading: boolean, title: string }) => {
    if (loading) {
        return (
            <View testID='movie-list-skeleton'>
                <MovieListSkeleton />
            </View>)
    }

    return (
        <View testID="movie-list-container" style={styles.container}>
            <Text style={{ color: "white", fontSize: 24, padding: 10 }}>{title}</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
});

export default MovieList;
