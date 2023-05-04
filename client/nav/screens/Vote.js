import React, { useContext, useState } from 'react';
import UserContext from '../../UserContext.js';
import RestaurantList from '../../components/restaurantList.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PartyList from '../../components/partylist.js';
import SelectWinner from '../../components/selectWinner.js';
import {useNavigation} from '@react-navigation/native'


export default function Vote({ }) {
  const {setYelpData, yelpData, loggedInParties, winnerWinner} = useContext(UserContext);
  const navigation = useNavigation()
  return (
    <View>
      {/* {winnerWinner ? (
        <SelectWinner winner={winnerWinner} />
      ) : yelpData ? (
        <RestaurantList yelpData={yelpData} />
      ) : null} */}
      <PartyList loggedInParties={loggedInParties} navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
  // return (
  //   <View>
  //     {winnerWinner ? (
  //       <SelectWinner />
  //     ) : (
  //       <>
  //         {yelpData && <RestaurantList yelpData={yelpData} />}
  //         <PartyList loggedInParties={loggedInParties} />
  //       </>
  //     )}
  //     <StatusBar style="auto" />
  //   </View>
  //   // <View >
  //   // {yelpData ? <RestaurantList yelpData={yelpData}/> : null}
  //   //   <PartyList loggedInParties={loggedInParties} />
  //   //   <StatusBar style="auto" />
  //   // </View>
  // );
}
