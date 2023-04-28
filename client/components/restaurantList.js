import React from 'react';
import { View, Text } from 'react-native';
import RestaurantCard from './restaurantCard';

const RestaurantList = ({ yelpData }) => {
    console.log(yelpData)
  return (
    <View>
      {yelpData && yelpData.businesses && yelpData.businesses.map(item => (
        <RestaurantCard
          key={item.name}
          restaurant={{
            name: item.name,
            image_url: item.image_url,
            location: item.location.display_address.join(', '),
            url: item.url
          }}
        />
      ))}
      {!yelpData && <Text>Start a party</Text>}
    </View>
  );
};

export default RestaurantList;