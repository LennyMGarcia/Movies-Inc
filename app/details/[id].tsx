import { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import useGuestSession from '@/hooks/useGuestSession';
import { useCast } from '@/hooks/useCast';
import { useRecommendations } from '@/hooks/useRecommendation';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import useSubmitRating from '@/hooks/useSubmitRating';
import useSnackbar from '@/hooks/useSnackbar';

import NotificationSnackbar from '@/components/NotificationSnackBar';
import CastList from '@/components/movies/CastList';
import RecommendedMovies from '@/components/movies/RecommendedMovies';
import FavouriteButton from '@/components/FavouriteButton';
import BackButton from '@/components/backButton';
import ScreenContainer from '@/components/ScreenContainer';

/**
 * Displays detailed information about a movie, including its title, rating, overview, 
 * genres, cast, and recommendations. It also allows users to rate the movie.
 *
 * This screen fetches movie details using multiple custom hooks:
 * - `useMovieDetails` to get movie data.
 * - `useCast` to retrieve cast information.
 * - `useRecommendations` for recommended movies.
 * - `useSubmitRating` to handle rating submission.
 * - `useSnackbar` to show notifications.
 *
 * Features:
 * - Displays a movie poster, title, status, release year, and runtime.
 * - Shows genres as tags.
 * - Allows users to rate the movie with a star rating component.
 * - Displays cast members and recommended movies.
 * - Uses a snackbar for rating submission feedback.
 *
 * @component
 * @returns {JSX.Element} The details screen for a specific movie.
 */

export default function DetailsScreen() {
    const { width, height } = Dimensions.get("window");
    const item = useLocalSearchParams();

    useGuestSession();
    
    const { submitRating } = useSubmitRating();
    const { showSnackbar, snackbarMessage, snackbarColor, snackbarVisible, setSnackbarVisible } = useSnackbar();

    const { colors } = useTheme();
    const { movie, loading, rating, setRating } = useMovieDetails(item.id);
    const { cast } = useCast(item.id);
    const { recommendations } = useRecommendations(item.id);

    //Convert 0-10 rating to 0-5 stars
    const displayRating = Math.round(rating / 2); 

    const imageUrl = "https://image.tmdb.org/t/p/w200";

    const handleRatingChange = async (newDisplayRating: number) => {

        //Convert 0-5 stars to 0-10 rating (MovieDB format)
        const newRating = Math.round(newDisplayRating * 2); 
        setRating(newRating);
        
        try {
            await submitRating(Number(item.id), newRating);
            showSnackbar("Rating submitted successfully!", "green");
        } catch (error) {
            showSnackbar("Failed to submit rating", "red");
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        );
    }

    return (
        <ScreenContainer style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <BackButton />
                <FavouriteButton movieId={Number(item.id)} size={35} top={30} />

                <Image
                    source={{ uri: `${imageUrl}${movie?.poster_path}` }}
                    style={{ width, height: height * 0.60, ...styles.detailImage }}
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
                    <View style={{ ...styles.ratingSquare, backgroundColor: colors.primary }}>
                        <Text style={styles.ratingText}>{rating?.toFixed(1)}</Text>
                    </View>
                    <StarRating
                        rating={displayRating}
                        starSize={30}
                        color="gold"
                        onChange={handleRatingChange}
                    />
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
        </ScreenContainer>
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
    detailImage: {
        resizeMode: "cover",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,

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
    ratingSquare: {

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
