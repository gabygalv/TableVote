import React, { useContext, useState } from 'react';
import {View, Text, StatusBar, TextInput, Button} from 'react-native'
import UserContext from '../UserContext.js';
import {Picker} from '@react-native-picker/picker';


const metersPerMile = 1609;

export default function PartyForm() {
  const { isLoggedIn, setRefresh } = useContext(UserContext);
  const [searchparty, setSearchparty] = useState({
    location: '',
    radius: '',
    term: '',
    price: ''
  });
  const [usernames, setUsernames] = useState([isLoggedIn.username]);

  
  console.log(usernames)
  
  const handleUsernamesChange = (text) => {
    const usernamesArray = text.split(",").map((name) => name.trim());
    setUsernames(usernamesArray.filter((name) => name !== ""));
  };
  
  
  const handleInputChange = (fieldName, value) => {
    if (fieldName === 'radius') {
      const radiusInMiles = parseInt(value);
      if (Number.isInteger(radiusInMiles)) {
        const radiusInMeters = radiusInMiles * metersPerMile;
        setSearchparty({ ...searchparty, radius: radiusInMiles, radiusInMeters });
      }
    } else {
      setSearchparty({ ...searchparty, [fieldName]: value });
    }
  };

  const handleSubmit = () => {
    
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creator_id: isLoggedIn.id,
        location: searchparty.location,
        term: searchparty.term,
        radius: searchparty.radiusInMeters,
        price: searchparty.price
      })
    };
  
    fetch('http://127.0.0.1:5555/parties', postOptions)
      .then((res) => {
        if (res.ok) {
          alert('Your party has been created, head to the vote tab to start voting!');
        } else {
          console.error('Error saving party data to database:', res.statusText);
          alert('Error saving party data to database:', res.statusText);
          setSearchparty(null);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          const id = data.id;
          const userArray = [...usernames, isLoggedIn.username];
          fetch('http://127.0.0.1:5555/partyusers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              party_id: id,
              usernames: userArray
            })
          });
          setRefresh(true);
        }
      })
      .catch((err) => console.error('Error saving party data to database:', err));
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

    <View
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text>Radius:</Text>
        <Picker
          style={{ width: '40%' }}
          selectedValue={searchparty.radius ? (searchparty.radius / 1609.34).toString() : null}
          onValueChange={(value) => handleInputChange('radius', value)}
          mode="dropdown"
        >
          <Picker.Item label="5 mile" value="5" />
          <Picker.Item label="10 miles" value="10" />
          <Picker.Item label="20 miles" value="20" />
          <Picker.Item label="30 miles" value="30" />
        </Picker>
      </View>

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
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 5,
        }}
        placeholder="Usernames"
        autoCapitalize="none"
        onChangeText={(text) => handleUsernamesChange(text)}
        value={usernames}
        />

    <View
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
      <Text>Price:</Text>
      <Picker
          label='Price'
          mode='dropdown'
          selectedValue={searchparty.price}
          onValueChange={(value) => handleInputChange('price', value)}
          style={{
            height: 10,
            width: '30%',
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
      </View>

      <Button title="Submit" onPress={handleSubmit} 
      style={{ color: '#2EC4B6' }}/>


      <StatusBar style="auto" />
    </View>
)}

