import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PartyCard({ partyId }) {
  const [party, setParty] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/parties/${partyId}`)
      .then(response => setParty(response.data))
      .catch(error => console.log(error));
  }, [partyId]);

  if (!party) {
    return null;
  }

  const partyUsers = party.party_users;
  const active = party.selected_restaurant_id || partyUsers.every(user => user.voted);

  return (
    <View>
      <Text>Party Users:</Text>
      {partyUsers.map(user => (
        <Text key={user.id}>{user.user_id}</Text>
      ))}
      <Text>Active: {active ? 'Yes' : 'No'}</Text>
    </View>
  );
}
