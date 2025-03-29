import { RootState } from '@/store/movieStore';
import { toggleFavorite } from '@/store/slices/favouriteSlice';
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 
import { useDispatch, useSelector } from 'react-redux';


interface FavouriteButtonProps {
  movieId: number; 
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.Favourite.ids); 

  const isFavorite = favoriteIds.includes(movieId);

  const handlePress = () => {
    dispatch(toggleFavorite(movieId)); 
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <View style={styles.iconContainer}>
        <Icon style={{fontSize:25}} name={isFavorite ? 'heart' : 'hearto'} size={30} color={isFavorite ? 'red' : 'white'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    height:500,
    zIndex: 10,
  },
  iconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)', 
    borderRadius: 25, 
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FavouriteButton;
