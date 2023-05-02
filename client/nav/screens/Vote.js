import React, { useContext, useEffect } from 'react';
import UserContext from '../../UserContext.js';
import RestaurantList from '../../components/restaurantList.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PartyList from '../../components/partylist.js';


export default function Vote() {
  const {setYelpData, yelpData, loggedInParties} = useContext(UserContext);
  

  return (
    <View >
    {yelpData ? <RestaurantList yelpData={yelpData}/> : null}
      <PartyList loggedInParties={loggedInParties} />
      <StatusBar style="auto" />
    </View>
  );
}
