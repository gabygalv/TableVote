import React from 'react';
import { FlatList, Text } from 'react-native';
import PartyCard from './partycard';

const PartyList = ({ loggedInParties, navigation }) => {

  return (
    <FlatList
      data={loggedInParties || []}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PartyCard
          party={item}
          navigation={navigation}
        />
      )}
      ListEmptyComponent={<Text>Start a party</Text>}
    />
  );
};

export default PartyList;