import React, { useContext, useState } from 'react';
import UserContext from '../../UserContext.js';
import RestaurantList from '../../components/restaurantList.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PartyList from '../../components/partylist.js';
import SelectWinner from '../../components/selectWinner.js';
import { useNavigation } from '@react-navigation/native'

export default function Vote({ }) {
  const { isLoggedIn, loggedInParties, setLoggedInParties, setRefresh, refresh } = useContext(UserContext);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefresh(!refresh)
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <PartyList
        setLoggedInParties={setLoggedInParties}
        loggedInParties={loggedInParties}
        navigation={navigation}
        isLoggedIn={isLoggedIn}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
