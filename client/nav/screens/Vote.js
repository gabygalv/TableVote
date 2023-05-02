import React, { useContext } from 'react';
import UserContext from '../../UserContext.js';
import RestaurantList from '../../components/restaurantList.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PartyList from '../../components/partylist.js';



export default function Vote() {
  const {isLoggedIn, yelpData, loggedInParties} = useContext(UserContext);

console.log('invote' + loggedInParties)
  return (
    <View >
      {/* <TouchableOpacity>
        
      </TouchableOpacity> */}
      {/* <RestaurantList yelpData={yelpData}/> */}
      <PartyList loggedInParties={loggedInParties} />
      <StatusBar style="auto" />
    </View>
  );
}
