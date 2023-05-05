import React from 'react';
import { FlatList, Text, View } from 'react-native';
import PastCard from './pastcard';

const PastParties = ({ loggedInParties }) => {
    console.log(loggedInParties)
    const filteredParties = loggedInParties.filter(party => party.past_section);

  return (
    <View style={{flex: 1}}>
    <FlatList
      data={filteredParties}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PastCard
          party={item}
        />
      )}
    />
    </View>
  );
};

export default PastParties;