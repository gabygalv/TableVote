import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import UserContext from '../UserContext.js';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PartyForm2() {

  const { isLoggedIn, setRefresh, refresh } = useContext(UserContext);
  const [usernames, setUsernames] = useState([isLoggedIn.username]);

  const [searchparty, setSearchparty] = useState({
    location: '',
    radius: '',
    term: '',
    price: ''
  });
  const [openPrice, setOpenPrice] = useState(false);
  const [priceVal, setPriceVal] = useState('');
  const [openRadius, setOpenRadius] = useState(false);
  const [radiusVal, setRadiusVal] = useState('');

  const handleInputChange = (fieldName, value) => {
    setSearchparty({ ...searchparty, [fieldName]: String(value) });
  };
  const handleUsernamesChange = (text) => {
    const usernamesArray = text.split(",").map((name) => name.trim());
    setUsernames(usernamesArray.filter((name) => name !== ""));
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
        radius: radiusVal,
        price: priceVal
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
          setRefresh(!refresh);
        }
      })
      .catch((err) => console.error('Error saving party data to database:', err));
  };
  console.log(priceVal)
  console.log(radiusVal)
  console.log(usernames)
  
  return(
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
  <Text>Invite your party! {isLoggedIn.username}</Text>
  
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Location"
      autoCapitalize="none"
      onChangeText={(text) => handleInputChange('location', text)}
      value={searchparty.location}
    />
  </View>

  
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Search Term"
      autoCapitalize="none"
      onChangeText={(text) => handleInputChange('term', text)}
      value={searchparty.term}
      />
      </View>
  
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Usernames"
      autoCapitalize="none"
      onChangeText={(text) => handleUsernamesChange(text)}
      value={usernames}
    />
  </View>

    <View style={styles.inputContainer}>
      <Text >Radius:</Text>
      <View >
      <DropDownPicker
        zIndex={2000}
        zIndexInverse={2000}
        open={openRadius}
        setOpen={setOpenRadius}
        value={radiusVal}
        setValue={setRadiusVal}
        items={[
          { label: '5 miles', value: '8045' },
          { label: '10 miles', value: '16090' },
          { label: '15 miles', value: '24135' },
          { label: '25 miles', value: '40000' },
        ]}
        textStyle={styles.pickerText}
        arrowStyle={styles.arrow}
        
        
        />
      </View>
    </View>

  <View style={styles.inputContainer}>
  <Text style={styles.pickerLabel}>Price:</Text>
 
  <DropDownPicker
        zIndex={3000}
        zIndexInverse={1000}
        open={openPrice}
        setOpen={setOpenPrice}
        value={priceVal}
        setValue={setPriceVal}
        items={[
          { label: '$', value: '1' },
          { label: '$$', value: '2' },
          { label: '$$$', value: '3' },
          { label: '$$$$', value: '4' },
        ]}
        textStyle={styles.pickerText}
        arrowStyle={styles.arrow}
      
      />
</View>
  
  <Button title="Submit" onPress={handleSubmit} style={{ color: '#2EC4B6' }}/>
</View>
  )}

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    flex: .5,
  },
});


