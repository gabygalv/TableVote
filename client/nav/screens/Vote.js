import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';

export default function Vote() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Vote</Text>
      <StatusBar style="auto" />
    </View>
  );
}
