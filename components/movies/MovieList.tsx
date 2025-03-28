import React from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import MovieCard from './MovieCard';
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies';


const MovieList = () => {
    const { movies, loading } = useUpcomingMovies();  

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={{ color: "white", fontSize: 24, padding: 10 }}>Release movies</Text>
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
        </SafeAreaView>
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

