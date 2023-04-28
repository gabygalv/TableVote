import React, { useContext } from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native'
import UserContext from '../../UserContext.js';

export default function Profile() {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);

  function handleLogout () {
    fetch('http://127.0.0.1:5555/logout', {
          method: 'DELETE'})
          .then((r) => {
            if (r.ok) {
              setIsLoggedIn(null)
            }
          })
  }

  return(
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Hello {isLoggedIn.username}</Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleLogout} style={{ 
            backgroundColor: '#2EC4B6', 
            padding: 10, 
            marginTop: 20,
            borderRadius: '5px'  }}>
            <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
)}

