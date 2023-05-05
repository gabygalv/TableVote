import React, { useContext, useState } from 'react';
import UserContext from '../../UserContext.js';
import RestaurantList from '../../components/restaurantList.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PartyList from '../../components/partylist.js';
import SelectWinner from '../../components/selectWinner.js';
import {useNavigation} from '@react-navigation/native'


export default function Vote({ }) {
  const { isLoggedIn, loggedInParties, setLoggedInParties} = useContext(UserContext);
  const navigation = useNavigation()
  return (
    <View>
      <PartyList 
      setLoggedInParties={setLoggedInParties} 
      loggedInParties={loggedInParties} 
      navigation={navigation} 
      isLoggedIn={isLoggedIn}
      />
      <StatusBar style="auto" />
    </View>
  );
  
}
