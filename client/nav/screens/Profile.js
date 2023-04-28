import * as React from 'react';
import {View, Text, StatusBar} from 'react-native'

export default function Profile() {
  return(
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Profile</Text>
      <StatusBar style="auto" />
    </View>
)}

