import React, {useContext} from 'react';
import { FlatList, Text, View } from 'react-native';
import PastCard from './pastcard';
import UserContext from '../UserContext.js';


const PastParties = () => {
    const { loggedInParties} = useContext(UserContext);
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