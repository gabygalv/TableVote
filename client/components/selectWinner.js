import { View, Text, Image, TouchableOpacity, Linking, Button, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import UserContext from '../UserContext.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SMS from 'expo-sms';

const SelectWinner = () => {
  const { winnerWinner, currentParty } = useContext(UserContext);
  const { name, rating, review_count, location, display_phone, image_url } = winnerWinner;

  const partyUsers = currentParty.party_users
  const phoneNumbers = partyUsers.map(partyUser => partyUser.user.phone)
  console.log(phoneNumbers);



  const handlePress = () => {
    Linking.openURL(image_url);
  };

  async function handleSMS() {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(phoneNumbers,
      `TableVote: The votes are in! We're going to ${name}`);
      if (result === 'cancelled') {
        console.log('user cancelled');
      } else if (result === 'sent') {
        console.log('success, sms sent or scheduled')
      } else {
        console.log('error, status of the message is unknown')
      }
    } else {
      console.log('error, sms not available')
    }
  }
 


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <TouchableOpacity onPress={handlePress}>
    <Image
      source={{ uri: image_url }}
      style={{ width: 350, height: 350, borderColor: '#2EC4B6', borderWidth: 5 }}
    />
  </TouchableOpacity>
  {name && <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{name}</Text>}
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    {rating && [...Array(Math.floor(rating))].map((_, i) => (
      <Ionicons key={i} name='star' color={'#2EC4B6'} size={20} />
      ))}
    {rating % 1 !== 0 && (
      <Ionicons name='star-half' color={'#2EC4B6'} size={20} />
      )}
    {rating && <Text style={{ fontSize: 20, marginLeft: 5 }}>{rating}</Text>}
    {review_count && <Text style={{ fontSize: 16, marginLeft: 10 }}>Reviews: ({review_count})</Text>}
  </View>
  {location?.display_address?.length > 0 && <Text style={{ fontSize: 16, marginTop: 10 }}>{location.display_address.join(', ')}</Text>}
  {display_phone && <Text style={{ fontSize: 16, marginTop: 10 }}>{display_phone}</Text>}
  {winnerWinner.url && 
  <Button title={'View on Yelp'} style={{ fontSize: 16, marginTop: 10 }} onPress={() => {
    Linking.openURL(winnerWinner.url);
  }} />}
  <TouchableOpacity onPress={handleSMS} style={styles.button}>
    <Text style={styles.buttonText}>Notify Party?</Text>
  </TouchableOpacity>
</View>
  );
};

export default SelectWinner;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2EC4B6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});