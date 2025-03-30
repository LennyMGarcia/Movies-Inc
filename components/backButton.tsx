import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'; 

const BackButton = () => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Icon name="arrowleft" size={35} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 20,
    top: 30,
    zIndex: 10,
  },
});
