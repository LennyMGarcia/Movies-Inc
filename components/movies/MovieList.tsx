import React from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import MovieCard from './MovieCard';
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies';
import { Movie } from '@/types/movieInterfaces';

const MovieList = ({ movies, loading, title }: { movies: Movie[], loading: boolean, title: string }) => {
    
    return (
        <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 24, padding: 10 }}>{title}</Text>
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    loadingText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        color: 'white',
    },
});

export default MovieList;

