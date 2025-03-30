import { RootState } from '@/store/movieStore';
import { toggleFavorite } from '@/store/slices/favouriteSlice';
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 
import { useDispatch, useSelector } from 'react-redux';

interface FavouriteButtonProps {
  movieId: number; 
  size?: number,
  top?: number,
  right?:number ,
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId, size, top, right }) => {

  const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.favourites.ids); 

  const isFavorite = favoriteIds.includes(movieId);

  const handlePress = () => {
    dispatch(toggleFavorite(movieId)); 
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{...styles.button, top: top ?? 0, right: right ?? 0,}}>
      <View style={styles.iconContainer}>
        <Icon style={{fontSize:size ?? 25}} name={isFavorite ? 'heart' : 'hearto'} size={30} color={isFavorite ? 'red' : 'white'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
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
