import React, { useContext } from 'react';
import { View, Text, StatusBar } from 'react-native';
import UserContext from '../../UserContext.js';
import RestaurantList from '../../components/restaurantList.js';


export default function Vote() {
  const {isLoggedIn, yelpData} = useContext(UserContext);


  return (
    <View >
      <Text>Vote! {isLoggedIn.username}</Text>
      <RestaurantList yelpData={yelpData}/>
      <StatusBar style="auto" />
    </View>
  );
}
