import { View, Text, Image, TouchableOpacity, Linking, Button } from 'react-native';
import React, { useContext } from 'react';
import UserContext from '../UserContext.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import yelp_burst from '../assets/yelp_burst.png';

const SelectWinner = ({party}) => {
  const { winnerWinner } = useContext(UserContext);
  const { name, rating, review_count, location, display_phone, image_url } = winnerWinner;
  console.log(party)

  const handlePress = () => {
    Linking.openURL(image_url);
  };


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
</View>
  );
};

export default SelectWinner;