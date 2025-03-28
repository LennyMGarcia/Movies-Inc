import { CastMember, Movie, RecommendedMovie } from '@/constants/commonInterfaces';
import ServerLinks from '@/constants/serverLinks';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, Image, Dimensions } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

export default function DetailsScreen() {

    const { width, height } = Dimensions.get("window")
    const item = useLocalSearchParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<CastMember[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const imageUrl: string = "https://image.tmdb.org/t/p/w200"

    useEffect(() => {
        fetchData(item.id);
    }, [item.id]);

    const fetchData = async (id: string | string[]) => {
        setLoading(true);
        await Promise.all([fetchMovieDetails(Number(id)), fetchCast(Number(id)), fetchRecommendations(Number(id))]);
        setLoading(false);
    };

    const fetchMovieDetails = async (id: number) => {
        try {
            const movieResponse = await fetch(ServerLinks.getMovieDetails(id), {
                method: 'GET',
                headers: ServerLinks.getHeaders(),
            });
            const movieData: Movie = await movieResponse.json();
            setMovie(movieData);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const fetchCast = async (id: number) => {
        try {
            const castResponse = await fetch(ServerLinks.getMovieCredits(id), {
                method: 'GET',
                headers: ServerLinks.getHeaders(),
            });
            const castData = await castResponse.json();
            setCast(castData.cast);
        } catch (error) {
            console.error('Error fetching cast:', error);
        }
    };

    const fetchRecommendations = async (id: number) => {
        try {
            const recommendationsResponse = await fetch(ServerLinks.getMovieRecommendations(id), {
                method: 'GET',
                headers: ServerLinks.getHeaders(),
            });
            const recommendationsData = await recommendationsResponse.json();
            setRecommendations(recommendationsData.results);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    const renderCastItem = ({ item: cast }: { item: CastMember }) => (
        <View style={styles.castItem}>
            <Image
                source={{ uri: `${imageUrl}${cast.profile_path}` }}
                style={styles.castImage}
            />
            <Text style={styles.castName}>
                {cast.name.length > 20 ? cast.name.slice(0, 20) + '...' : cast.name}
            </Text>
            <Text style={styles.castCharacter}>
                {cast.character.length > 20 ? cast.character.slice(0, 20) + '...' : cast.character}
            </Text>
        </View>
    );

    const renderRecommendationItem = ({ item: movie }: { item: RecommendedMovie }) => (
        <View style={styles.recommendationItem}>
            <Image
                source={{ uri: `${imageUrl}${movie.poster_path}` }}
                style={styles.recommendationImage}
            />
            <Text style={styles.recommendedMovie}>
                {movie.title.length > 20 ? movie.title.slice(0, 20) + '...' : movie.title}
            </Text>
        </View>
    );

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
                style={{ width, height: height * 0.60, marginLeft: -10, resizeMode: "cover", objectFit: "cover", borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
            />
            <View style={{ position: "absolute", bottom: 0 }}>
            </View>


            <Text style={styles.title}>{movie?.title}</Text>
            <Text style={styles.movieDetails}>
                {movie?.status?.split('-')[0]} •  {movie?.release_date?.split('-')[0]}
            </Text>
            <Text style={styles.movieDetails}>
                {movie?.runtime + " min"}
            </Text>
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
                    <Text style={styles.ratingText}>{(movie!.vote_average).toFixed(1)}</Text>
                </View>

                <View style={styles.starContainer}>
                    <StarRatingDisplay
                        rating={movie!.vote_average! / 2}
                        starSize={18}
                        color="gold"
                    />
                </View>
            </View>

            {/* Cast */}
            <Text style={styles.sectionTitle}>Casting</Text>
            {cast && cast.length > 0 ? (
                <FlatList
                    data={cast}
                    renderItem={renderCastItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.carousel}
                    contentContainerStyle={styles.carouselContainer}
                />
            ) : (
                <Text style={{ color: "white" }}>No cast available.</Text>
            )}

            {/* Recommended Movies */}
            <Text style={styles.sectionTitle}>Recommended Movies</Text>
            {recommendations && recommendations.length > 0 ? (
                <FlatList
                    data={recommendations}
                    renderItem={renderRecommendationItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.carousel}
                    contentContainerStyle={styles.carouselContainer}
                />
            ) : (
                <Text style={{ color: "white" }}>No recommendations available.</Text>
            )}
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
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
        marginTop: 20
    },
    overview: {
        fontSize: 16,
        color: '#BBBBBB',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'white',
        marginBottom: 25
    },
    carousel: {
        marginBottom: 20,
    },
    carouselContainer: {
        paddingHorizontal: 5,
    },
    castItem: {
        alignItems: 'center',
        marginRight: 10,
    },
    castImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        objectFit: "cover",
    },
    castName: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 15,
        color: 'white',
    },
    castCharacter: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 13,
        color: '#BBBBBB',
    },
    recommendationItem: {
        alignItems: 'center',
        marginRight: 10,
    },
    recommendationImage: {
        width: 200,
        height: 250,
        borderRadius: 5,
    },
    recommendedMovie: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        color: 'white',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
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
