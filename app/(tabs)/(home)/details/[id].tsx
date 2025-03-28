import { CastMember, Movie, RecommendedMovie } from '@/Types/movieInterfaces';
import ServerLinks from '@/api/serverLinks';
import CastList from '@/components/movies/CastList';
import NotificationSnackbar from '@/components/NotificationSnackBar';
import RecommendedMovies from '@/components/movies/RecommendedMovies';
import useGuestSession from '@/hooks/useGuestSession';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { useCast } from '@/hooks/useCast';
import { useRecommendations } from '@/hooks/useRecommendation';
import { useMovieDetails } from '@/hooks/useMovieDetails';

export default function DetailsScreen() {
    const { width, height } = Dimensions.get("window");
    const item = useLocalSearchParams();
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("green");

    useGuestSession();

    const { movie, loading, rating, setRating } = useMovieDetails(item.id);
    const { cast } = useCast(item.id);
    const { recommendations } = useRecommendations(item.id);

    const displayRating = rating / 2;

    const imageUrl = "https://image.tmdb.org/t/p/w200";

    const submitRating = async (movieId: number, userRating: number) => {
        const sessionId = await AsyncStorage.getItem('guestSession'); 

        if (!sessionId) {
            console.error('No guest session available');
            return;
        }

        try {
            const response = await fetch(ServerLinks.rateMovie(movieId, sessionId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    ...ServerLinks.getHeaders(), 
                },
                body: JSON.stringify({
                    value: userRating, 
                }),
            });

            const data = await response.json();
            console.log("Respuesta de la API al votar:", data);

            if (response.ok) {
                console.log('Rating submitted successfully');
                setSnackbarMessage("Rating submitted successfully!");
                setSnackbarColor("green");
                setSnackbarVisible(true);
            } else {
                console.error('Failed to submit rating');
                setSnackbarMessage("Failed to submit rating");
                setSnackbarColor("red");
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            setSnackbarMessage("Error submitting rating");
            setSnackbarColor("red");
            setSnackbarVisible(true);
        }
    };

    const handleRatingChange = async (newDisplayRating: number) => {
        const newRating = newDisplayRating * 2;
        setRating(newRating);
        await submitRating(Number(item.id), newRating)
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `${imageUrl}${movie?.poster_path}` }}
                style={{ width, height: height * 0.60, resizeMode: "cover", borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
            />

            <Text style={styles.title}>{movie?.title}</Text>
            <Text style={styles.movieDetails}>{movie?.status?.split('-')[0]} • {movie?.release_date?.split('-')[0]}</Text>
            <Text style={styles.movieDetails}>{movie?.runtime} min</Text>

            <View style={styles.genresContainer}>
                {movie?.genres?.map((g, index) => (
                    <View key={index} style={styles.genreTag}>
                        <Text style={styles.genreText}>{g.name}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.overview}>{movie?.overview}</Text>
            <View style={styles.ratingContainer}>
                <View style={styles.ratingCircle}>
                    <Text style={styles.ratingText}>{rating?.toFixed(1)}</Text>
                </View>
                <StarRating
                    rating={displayRating}
                    starSize={30}
                    color="gold"
                    onChange={handleRatingChange} />
            </View>

            <Text style={styles.sectionTitle}>Casting</Text>
            <CastList cast={cast} />

            <Text style={styles.sectionTitle}>Recommended Movies</Text>
            <RecommendedMovies recommendations={recommendations} />
            <NotificationSnackbar
                message={snackbarMessage}
                color={snackbarColor}
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
            />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieDetails: {
        fontSize: 18,
        color: '#EEEEEE',
        textAlign: 'center',
        marginTop: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    overview: {
        fontSize: 16,
        color: '#BBBBBB',
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginBottom: 25,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 5,
    },
    genreTag: {
        backgroundColor: '#333',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    genreText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
