import React from 'react';
import { FlatList, Text, View } from 'react-native';
import PartyCard from './partycard';

const PastParties = ({ loggedInParties, navigation }) => {
    console.log(loggedInParties)
    const filteredParties = loggedInParties.filter(party => party.past_section);

  return (
    <View style={{flex: 1}}>
    <FlatList
      data={filteredParties}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PartyCard
          party={item}
          navigation={navigation}
        />
      )}
    />
    </View>
  );
};

export default PastParties;