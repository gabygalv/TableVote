import React, {useContext} from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import RestaurantCard from './restaurantCard';
import UserContext from '../UserContext.js';
import { useNavigation } from '@react-navigation/native';



const RestaurantList = () => {
  const { yelpData} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <FlatList
      data={yelpData?.businesses || []}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <RestaurantCard
          restaurant={item}
          navigation={navigation}
        />
      )}
      ListEmptyComponent={<Text style={styles.headerText}>No Search Results Available</Text>}
    />
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex:1, 
    marginTop:50, 
    backgroundColor: '#FF9F1C',
    justifyContent: 'space-around',
    padding: 10
  },
});