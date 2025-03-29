import { CastMember } from '@/types/movieInterfaces';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const imageUrl = "https://image.tmdb.org/t/p/w200";

const CastList = ({ cast }: { cast: CastMember[] }) => {
    if (!cast || cast.length === 0) {
        return <Text style={{ color: "white" }}>No cast available.</Text>;
    }

    const renderCastItem = ({ item }: { item: CastMember }) => (
        <View style={styles.castItem}>
            <Image source={{ uri: item.profile_path ? `${imageUrl}${item.profile_path}` : "https://i.ibb.co/WNg5ntkK/no-Cast-Available.webp" }} style={styles.castImage} />
            <Text style={styles.castName}>{item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}</Text>
            <Text style={styles.castCharacter}>{item.character.length > 20 ? item.character.slice(0, 20) + '...' : item.character}</Text>
        </View>
    );

    return (
            <FlatList
                data={cast}
                renderItem={renderCastItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
                contentContainerStyle={styles.carouselContainer}
            />
    );
};

const styles = StyleSheet.create({
    castItem: {
        alignItems: 'center',
        marginRight: 10,
    },
    castImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
    carousel: {
        marginBottom: 20,
    },
    carouselContainer: {
        paddingHorizontal: 5,
    },
});

export default CastList;
