import React, {useContext} from 'react';
import { FlatList, Text } from 'react-native';
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
      ListEmptyComponent={<Text>No Search Results Available</Text>}
    />
  );
};

export default RestaurantList;