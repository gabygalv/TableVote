import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import UserContext from '../UserContext.js';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PartyForm() {

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
  const [joining, setJoining] = useState(false);
  const [partyCode, setPartyCode] = useState('');

  const handleInputChange = (fieldName, value) => {
    setSearchparty({ ...searchparty, [fieldName]: String(value) });
  };
  const handleUsernamesChange = (text) => {
    const usernamesArray = text.split(",").map((name) => name.trim());
    setUsernames(usernamesArray.filter((name) => name !== ""));
  };

  const handleSubmit = async () => {
    try {
      const usersResponse = await fetch('http://tablevote.onrender.com/users');
      const users = await usersResponse.json();
      const usernamesSet = new Set(usernames);
      const existingUsernamesSet = new Set(users.map(user => user.username));
      
      // Check that all usernames in the usernames array exist in the users endpoint
      for (const username of usernamesSet) {
        if (!existingUsernamesSet.has(username)) {
          alert(`User with username "${username}" does not exist`);
          return;
        }
      }
  
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
    
      const partiesResponse = await fetch('http://tablevote.onrender.com/parties', postOptions);
      if (!partiesResponse.ok) {
        const errorText = await partiesResponse.text();
        console.error('Error saving party data to database:', errorText);
        alert('Error saving party data to database:', errorText);
        return;
      }
  
      const data = await partiesResponse.json();
      const id = data.id;
      const userArray = [...usernamesSet, isLoggedIn.username];
      const partyUsersResponse = await fetch('http://tablevote.onrender.com/partyusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          party_id: id,
          usernames: userArray
        })
      });
      if (!partyUsersResponse.ok) {
        const errorText = await partyUsersResponse.text();
        console.error('Error saving party data to database:', errorText);
        alert('Error saving party data to database:', errorText);
        return;
      }
  
      setRefresh(!refresh);
      setSearchparty('')
      setPriceVal('')
      setRadiusVal('')
      setUsernames('')
      alert('Your party has been created, head to the vote tab to start voting!');
    } catch (err) {
      console.error('Error saving party data to database:', err);
      alert('Error saving party data to database:', err);
    }
  };

  function handleJoin () {
    fetch('http://tablevote.onrender.com/partyusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          party_id: partyCode,
          usernames: [isLoggedIn.username]
        })
      });
  
      setRefresh(!refresh);
      setPartyCode('')
      alert('You\'ve been added to the party, head to the vote tab to start voting!');
    } 

    console.log(partyCode);
    
  return(
    <View style={{ flex:1, marginTop:50, justifyContent:'top', alignItems:'center' }} >
    {joining ? 
    <>
    <View style={styles.header}>
    <Text style={styles.headerText}>Join a party, {isLoggedIn.username}!</Text>
    </View>
    <View style={styles.inputContainer}>
      <Text >Party code:</Text>
      <TextInput
        style={styles.input}
        placeholder="enter your party code"
        autoCapitalize="none"
        onChangeText={(text) => setPartyCode(text)}
        value={partyCode}
      />
    </View> 
    <TouchableOpacity onPress={handleJoin} style={{ 
      backgroundColor: '#2EC4B6', 
      padding: 10, 
      marginTop: 20,
      borderRadius: 5  }}>
      <Text style={{ color: 'white' }}>Join</Text>
      </TouchableOpacity>
      <View style={styles.bannerContainer}>
      <TouchableOpacity onPress={() => setJoining(!joining)}> 
        <Text style={styles.bannerText}>Create a party instead?</Text>
      </TouchableOpacity> 
    </View>
    </>
    :
    <>
    <View style={styles.header}>
    <Text style={styles.headerText}>Start a party, {isLoggedIn.username}!</Text>
    </View>
      <View style={styles.pickerContainer}>
      <Text >Price Range:</Text>
      <DropDownPicker
            transparent={false}
            zIndex={2000}
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
    <View style={styles.inputContainer}>
      <Text >Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="neighborhood, city, state, or zip"
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange('location', text)}
        value={searchparty.location}
      />
    </View>

    
    <View style={styles.inputContainer}>
      <Text >Search Term:</Text>
      <TextInput
        style={styles.input}
        placeholder="tacos, hawaiian, bars, etc"
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange('term', text)}
        value={searchparty.term}
        />
        </View>
    
    <View style={styles.inputContainer}>
    <Text >Usernames:</Text>
      <TextInput
        style={styles.input}
        placeholder="enter usernames separated by a comma"
        autoCapitalize="none"
        onChangeText={(text) => handleUsernamesChange(text)}
        value={usernames}
      />
    </View>

      <View style={styles.pickerContainer}>
        <Text > Search Radius:</Text>
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

      <TouchableOpacity onPress={handleSubmit} style={{ 
      backgroundColor: '#2EC4B6', 
      padding: 10, 
      marginTop: 20,
      borderRadius: 5  }}>
      <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.bannerContainer}>
      <TouchableOpacity onPress={() => setJoining(!joining)}> 
        <Text style={styles.bannerText}>Joining an existing party?</Text>
      </TouchableOpacity> 
    </View>
      </>
      }
  </View>
  )}

const styles = StyleSheet.create({
  inputContainer: {
    width: '85%',
    marginTop: 15,
  },
  pickerContainer: {
    width: '85%',
    marginTop: 15,
    zIndex: 999
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FF9F1C',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#2EC4B6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});


