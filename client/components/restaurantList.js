import React from 'react';
import { FlatList, Text } from 'react-native';
import RestaurantCard from './restaurantCard';

const RestaurantList = ({ yelpData }) => {
  return (
    <FlatList
      data={yelpData?.businesses || []}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <RestaurantCard
          restaurant={item}
        />
      )}
      ListEmptyComponent={<Text>No Search Results Available</Text>}
    />
  );
};

export default RestaurantList;