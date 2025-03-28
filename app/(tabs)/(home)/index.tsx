import React, { useEffect, useState } from 'react';
import { FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Appbar } from 'react-native-paper';
import { StarRatingDisplay } from "react-native-star-rating-widget";
import ServerLinks from '../../../constants/serverLinks';
import { useRouter } from 'expo-router';
import { Movie } from '@/constants/commonInterfaces';

export default function TabTwoScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(ServerLinks.getUpcomingMovies(), {
          method: 'GET',
          headers: ServerLinks.getHeaders(),
        });

        const data = await response.json();

        const sortedMovies = data.results.sort((a: any, b: any) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );

        setMovies(sortedMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleDetails = () =>{

  }

  const renderItem = ({ item }: { item: Movie }) => (
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
              <Text style={styles.ratingText}>{(item.vote_average ).toFixed(1)}</Text>
            </View>

            <View style={styles.starContainer}>
              <StarRatingDisplay
                rating={item.vote_average/2}
                starSize={18}
                color="gold"
              />
            </View>
          </View>

          <Card.Actions>
            <Button onPress={() => router.push({pathname: '/details/[id]', params: {id: item.id}})}>Ver Detalles</Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content
          title={
            <Text style={styles.title}>
              <Text style={styles.moviesText}>Movies</Text>
              <Text style={styles.incText}> Inc</Text>
            </Text>
          }
        />
      </Appbar.Header>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

// Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moviesText: {
    color: 'white',
  },
  incText: {
    color: 'blue',
  },
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
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
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
    paddingRight:0,
  },
});
