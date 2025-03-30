import React from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import MovieCard from './MovieCard';
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies';
import { Movie } from '@/types/movieInterfaces';
import { MotiView } from 'moti';

const MovieList = ({ movies, loading, title }: { movies: Movie[], loading: boolean, title: string }) => {

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{ color: "white", fontSize: 24, padding: 10 }}>{title}</Text>
                {[...Array(3)].map((_, index) => (
                    <View key={index.toString() + 'm'} style={styles.skeletonContainer}>
                        <MotiView
                            from={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ loop: true, duration: 1000 }}
                            style={styles.skeletonImage}
                        />
                        <MotiView
                            from={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ loop: true, duration: 1000 }}
                            style={styles.skeletonText}
                        />
                        <MotiView
                            from={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ loop: true, duration: 1000 }}
                            style={styles.skeletonText}
                        />
                    </View>
                ))}
            </View>

        )
    }

    return (
        <View style={styles.container}>
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
    skeletonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 12,
    },
    skeletonImage: {
        width: 150,
        height: 200,
        backgroundColor: '#333',
        marginRight: 12,
        borderRadius: 8,
    },
    skeletonText: {
        width: '80%',
        height: 20,
        backgroundColor: '#333',
        marginTop: 6,
        borderRadius: 5,
    },
});

export default MovieList;

