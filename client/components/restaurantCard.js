import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const RestaurantCard = ({ restaurant }) => {
  
  console.log('incard:' +restaurant.name)

  return (
    <TouchableOpacity style={styles.container} 
    onPress={() => window.open(url, '_blank')}
    >
      <Image style={styles.image} source={{ uri: restaurant.image_url }} />
      <View style={styles.details}>
        <Text style={styles.name}>{restaurant.name}</Text>
        {/* <Text style={styles.address}>{restaurant.location.display_address.join(', ')}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  details: {
    flex: 1,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
});

export default RestaurantCard;