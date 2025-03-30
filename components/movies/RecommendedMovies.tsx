import { RecommendedMovie } from '@/types/movieInterfaces';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const imageUrl = "https://image.tmdb.org/t/p/w200";

const RecommendedMovies = ({ recommendations }: { recommendations: RecommendedMovie[] }) => {
    if (!recommendations || recommendations.length === 0) {
        return (
            <View style={{ marginBottom: 50 }}>
                <Text style={{ color: "white" }}>No recommendations available.</Text>
            </View>
        )
    }

    const renderRecommendationItem = ({ item }: { item: RecommendedMovie }) => (
        <View style={styles.recommendationItem}>
            <Image
            testID="recommendation-image"
             source={{ uri: item.poster_path 
                ? `${imageUrl}${item.poster_path}` 
                : 'https://i.ibb.co/HDq2F3vx/no-Poster-Available.webp' }} style={styles.recommendationImage} />
            <Text style={styles.recommendedMovie}>
                {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
            </Text>
        </View>
    );

    return (
        <FlatList
            data={recommendations}
            renderItem={renderRecommendationItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            contentContainerStyle={styles.carouselContainer}
        />
    );
};

const styles = StyleSheet.create({
    recommendationItem: {
        alignItems: 'center',
        marginRight: 10,
    },
    recommendationImage: {
        width: 200,
        height: 250,
        borderRadius: 5,
        objectFit:"contain"
    },
    recommendedMovie: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        color: 'white',
    },
    carousel: {
        marginBottom: 20,
    },
    carouselContainer: {
        paddingHorizontal: 5,
    },
});

export default RecommendedMovies;
