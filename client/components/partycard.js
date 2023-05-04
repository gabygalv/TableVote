import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserContext from '../UserContext.js';
import SelectWinner from './selectWinner.js';


export default function PartyCard({ party, navigation }) {
  const {setYelpData, setCurrentParty, setWinnerWinner, yelpData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {  
    setIsLoading(true);
    setCurrentParty(party)
    const urlParams = new URLSearchParams({
      location: party.location,
      radius: party.radius,
      term: party.term,
      price: party.price,
    });

    console.log(urlParams)
    const url = `http://127.0.0.1:5555/yelpsearch?${urlParams.toString()}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setYelpData(data);
        console.log(yelpData)
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false)
        navigation.navigate('RestaurantList',{ yelpData: yelpData }); 
        ;
      });
  };

  function handleSelectRestaurant() {
    fetch(`http://127.0.0.1:5555/partiesrestaurant/${party.id}`)
      .then(response => response.json())
      .then(data => {
        const restaurantId = data;
        console.log(restaurantId)
        return fetch(`http://127.0.0.1:5555/yelpsearchbyid/${restaurantId}`);
      })
      .then(response => response.json())
      .then(data => {
        setWinnerWinner(data);
        return fetch(`http://127.0.0.1:5555/parties/${party.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            selected_restaurant_id: data.id
          })
        })
      })
      .then(response => response.json())
      .then(() => {
        navigation.navigate('SelectWinner'); 
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#2EC4B6" />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.container}
        >
          <View style={styles.details}>
            <Text style={styles.info}>
              Party Location: {party.location}
            </Text>
            <Text style={styles.info}>
              Created by: {party.user.username}
            </Text>
            <Text style={styles.info}>
              Created at: {party.created_at}
            </Text>
            <View style={styles.users}>
              <Text style={styles.info}>Users in Party: </Text>
              {party.party_users.map((user) => (
                <View style={styles.user} key={user.id}>
                  <Text style={styles.username}>
                    {user.user.username}
                    {user.voted ? (
                      <Ionicons name="thumbs-up" color={"#2EC4B6"} />
                    ) : (
                      <Ionicons name="hourglass" color={"#2EC4B6"} />
                    )}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {party.selected_restaurant_id === null && party.party_users.every(user => user.voted) ? (
            <TouchableOpacity style={styles.status} onPress={handleSelectRestaurant}>
              <Text style={styles.voteButtonText}>Votes  are in!</Text>
            </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.winner} onPress={handlePress}>
            <Text style={styles.voteButtonText} >Vote</Text>
          </TouchableOpacity>
          )}
       
        </TouchableOpacity>
      )}
    </>
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
      padding: 1,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: '#2EC4B6',
      flex: .25,
        },
    active: {
      color: '#fff',
      marginLeft: 16,
    },
    winner: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: '#ff9f1c',
      flex: .25,
    },
    spinner: {
      flex: 1,
      justifyContent: 'center',
      lexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    voteButton: {
      backgroundColor: '#2EC4B6',
      padding: 8,
      borderRadius: 4,
      marginLeft: 16,
    },
    voteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
})