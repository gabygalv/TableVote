import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Modal, Linking, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserContext from '../UserContext.js';
import SelectWinner from './selectWinner.js';


export default function PastCard({ party, navigation, onDelete, onArchive }) {
  const {winnerWinner, setWinnerWinner, yelpData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  

 
  function handleViewWinner() {
    setIsLoading(true);
    fetch(`http://127.0.0.1:5555/parties/${party.id}`)
      .then(response => response.json())
      .then(data => {
        const restaurantId = data.selected_restaurant_id;
        return fetch(`http://127.0.0.1:5555/yelpsearchbyid/${restaurantId}`);
      })
      .then(response => response.json())
      .then(data => {
        setWinnerWinner(data);
      })
      .finally(() => {
        setIsLoading(false)
        setModalVisible(!modalVisible);  
        ;
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
          

          {party.selected_restaurant_id || party.party_users.every(user => user.voted) ? (
            <TouchableOpacity style={styles.status} onPress={handleViewWinner}>
              <Text style={styles.voteButtonText}>View Winner</Text>
            </TouchableOpacity>
          ) : null} 
       
        </TouchableOpacity>
      )}

      {winnerWinner ? <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

                <View style={{  alignItems: 'center', justifyContent: 'center' }}>
                    
                  {winnerWinner.name && <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{winnerWinner.name}</Text>}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    {winnerWinner.rating && [...Array(Math.floor(winnerWinner.rating))].map((_, i) => (
                      <Ionicons key={i} name='star' color={'#FF9F1C'} size={20} />
                    ))}
                    {winnerWinner.rating % 1 !== 0 && (
                      <Ionicons name='star-half' color={'#FF9F1C'} size={20} />
                    )}
                    {winnerWinner.rating && <Text style={{ fontSize: 20, marginLeft: 5 }}>{winnerWinner.rating}</Text>}
                    {winnerWinner.review_count && <Text style={{ fontSize: 16, marginLeft: 10 }}>Reviews: ({winnerWinner.review_count})</Text>}
                  </View>
                  {winnerWinner.location?.display_address?.length > 0 && <Text style={{ fontSize: 16, marginTop: 10 }}>{winnerWinner.location.display_address.join(', ')}</Text>}
                  {winnerWinner.display_phone && <Text style={{ fontSize: 16, marginTop: 10 }}>{winnerWinner.display_phone}</Text>}
                  {winnerWinner.url && <Button title={'View on Yelp'} style={{ fontSize: 16, marginTop: 10 }} onPress={() => {
                    Linking.openURL(winnerWinner.url);
                  }} />}
                </View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ 
                backgroundColor: '#FF9F1C', 
                padding: 10, 
                marginTop: 20,
                borderRadius: '5px'  }}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> :null}
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
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 40,
      borderRadius: 10,
      alignItems: 'center',
    },
   
})