import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

const MovieListSkeleton = () => {
  return (
    <View testID="movie-list-skeleton" style={styles.container}>
      {[...Array(3)].map((_, index) => (
        <View  key={index.toString() + 'm'} style={styles.skeletonContainer}>
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

export default MovieListSkeleton;
