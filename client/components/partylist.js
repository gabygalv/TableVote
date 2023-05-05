import React from 'react';
import { FlatList, View, Image, Text } from 'react-native';
import PartyCard from './partycard';
import NewParty from '../assets/newParty.png'


const PartyList = ({ loggedInParties, navigation, setLoggedInParties, isLoggedIn }) => {

  const handleDeleteParty = (partyId) => {
    fetch(`http://127.0.0.1:5555/parties/${partyId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        setLoggedInParties(loggedInParties.filter(party => party.id !== partyId))
      }})
    .catch(error => {
      console.error(error);
    });
  }

  const handleArchiveParty = (partyId) => {
    fetch(`http://127.0.0.1:5555/parties/${partyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        past_section: true
      })
    }) 
    .then(res => {
      if (res.ok) {
        fetch(`http://127.0.0.1:5555/users/${isLoggedIn.id}/parties`)
          .then((res) => res.json())
          .then((parties) => {
            setLoggedInParties(parties);
          });
      }})
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <FlatList
      data={(loggedInParties.filter(party => !party.past_section)) || []}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PartyCard
          party={item}
          navigation={navigation}
          onDelete={() => handleDeleteParty(item.id)}
          onArchive={() => handleArchiveParty(item.id)}
        />
      )}
      ListEmptyComponent={
        <View style={{ bottom: 180  }}>
          <Image source={NewParty} style={{ width: '60%', resizeMode: 'contain', alignSelf: 'center'  }} />
        </View>
    }
    />
  );
};

export default PartyList;