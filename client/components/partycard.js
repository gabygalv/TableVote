import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PartyCard({ party }) {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);

  const handlePress = useCallback(() => {
    const urlParams = new URLSearchParams({
      location: party.location,
      radius: party.radiusInMeters,
      term: party.term,
      price: party.price,
    });
    const url = `http://127.0.0.1:5555/yelpsearch?${urlParams.toString()}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.businesses);
        navigation.navigate('RestaurantList', { restaurants: data.businesses });
      })
      .catch((error) => console.error(error));
  }, [navigation, party]);


    return (
      <TouchableOpacity style={styles.container} 
      onPress={handlePress}
      >
        <View style={styles.details}>
          <Text style={styles.info}>Party Location: {party.location}</Text>
          <Text style={styles.info}>Created by: {party.user.username}</Text>
          <Text style={styles.info}>Created at: {party.created_at}</Text>
          <View style={styles.users}> 
          <Text style={styles.info}>Users in Party: </Text>
          {party.party_users.map(user => (
            <View style={styles.user} key={user.id}>
              <Text style={styles.username}>{user.user.username}
              {user.voted ? <Ionicons name='thumbs-up' color={'#2EC4B6'}/> : <Ionicons name='hourglass' color={'#2EC4B6'}/>}
              </Text>
            </View>
          ))}
        </View>
        </View>
        <View style={styles.status}>
          {party.selected_restaurant_id ===null  ? (
            <Text style={styles.active}>Vote!</Text>
          ) : (
            <Text style={styles.inactive}>Completed</Text>
          )}
        </View> 
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 3,
      flexDirection: 'row',
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    image: {
      height: 125,
      width: 125,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      marginRight: 8,
    },
    details: {
      flex: 1,
      padding: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    info: {
      color: '#666',
      marginBottom: 4,
    },
    users: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 4,
    },
    user: {
      borderRadius: 50,
      backgroundColor: '#eee',
      padding: 4,
      marginRight: 4,
      marginBottom: 4,
    },
    username: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    status: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: '#2EC4B6',
    },
    active: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
    inactive: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
})
