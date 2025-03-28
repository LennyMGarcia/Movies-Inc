import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Movie } from '@/Types/movieInterfaces';
import { useRouter } from 'expo-router';

const MovieCard = ({ item }: { item: Movie }) => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Title style={styles.movieTitle}>{item.title}</Title>
                        <Paragraph style={styles.text}>
                            <Text style={styles.boldText}>Release Date: </Text>
                            {item.release_date}
                        </Paragraph>

                        <View style={styles.ratingContainer}>
                            <View style={styles.ratingCircle}>
                                <Text style={styles.ratingText}>{(item.vote_average).toFixed(1)}</Text>
                            </View>

                            <View style={styles.starContainer}>
                                <StarRatingDisplay
                                    rating={item.vote_average / 2}
                                    starSize={18}
                                    color="gold"
                                />
                            </View>
                        </View>

                        <Card.Actions>
                            <Button onPress={() => router.push({ pathname: '/details/[id]', params: { id: item.id } })}>
                                Ver Detalles
                            </Button>
                        </Card.Actions>
                    </View>
                </View>
            </Card>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1E1E1E',
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 10,
        padding: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    text: {
        fontSize: 16,
        color: '#BBBBBB',
    },
    boldText: {
        fontWeight: 'bold',
        color: 'white',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingCircle: {
        backgroundColor: '#415A77',
        borderRadius: 5,
        padding: 5,
    },
    ratingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#232323",
        borderRadius: 5,
        padding: 7,
        paddingRight: 0,
    },
});

export default MovieCard;
