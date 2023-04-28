import React, { useContext } from 'react';
import {View, Text, StatusBar} from 'react-native'
// import UserContext from '.../UserContext.js';


export default function Profile() {
  // const {isLoggedIn} = useContext(UserContext);

  return(
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Hello {isLoggedIn.username}</Text>
      <StatusBar style="auto" />


    </View>
)}

