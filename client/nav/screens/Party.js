import React, { useContext, useState } from 'react';
import {View, Text, StatusBar, TextInput, Button} from 'react-native'
import UserContext from '../../UserContext.js';
import {Picker} from '@react-native-picker/picker';



export default function Party() {
  const {isLoggedIn, yelpData, setYelpData} = useContext(UserContext);
  const [searchparty, setSearchparty] = useState({
    location: '',
    radius: '',
    term: '',
    price: ''
  });
  
  const handleInputChange = (fieldName, value) => {
    setSearchparty({...searchparty, [fieldName]: value});
  };

  const handleSubmit = () => {
    const urlParams = new URLSearchParams({
      location: searchparty.location,
      term: searchparty.term,
      radius: searchparty.radius,
      price: searchparty.price
    });
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, 
    };
  
      fetch(`http://127.0.0.1:5555/yelpsearch?${urlParams.toString()}`, requestOptions)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              setYelpData(data);
            })
          }
        });
    };

    console.log(searchparty)

  return(
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Invite your party! {isLoggedIn.username}</Text>
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 5,
        }}
        placeholder="Location"
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange('location', text)}
        value={searchparty.location}
      />

      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 5,
        }}
        placeholder="Radius"
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange('radius', text)}
        value={searchparty.radius}
      />

      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 5,
        }}
        placeholder="Search Term"
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange('term', text)}
        value={searchparty.term}
      />

    <Picker
        label='Price'
        mode='dropdown'
        selectedValue={searchparty.price}
        onValueChange={(value) => handleInputChange('price', value)}
        style={{
          height: 10,
          width: '50%',
          marginTop: 20,
          borderRadius: 5,
        }}
      >
        <Picker.Item 
          color='#2EC4B6'
          label="$" 
          value="1" />
        <Picker.Item 
          color='#2EC4B6'
          label="$$" 
          value="2" />
        <Picker.Item 
          color='#2EC4B6'
          label="$$$" 
          value="3" />
        <Picker.Item 
          color='#2EC4B6'
          label="$$$$" 
          value="4" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} 
      style={{ color: '#2EC4B6' }}/>


      <StatusBar style="auto" />
    </View>
)}

