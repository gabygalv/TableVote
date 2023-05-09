import React, {useContext} from 'react';
import { FlatList, Text } from 'react-native';
import MissedCard from './missedCard';
import UserContext from '../UserContext.js';

const MissedConnections = () => {
    const { missed } = useContext(UserContext);

    

  return (
    <FlatList
      data={ missed || []}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <MissedCard
          restaurant={item}
        />
      )}
      ListEmptyComponent={<Text>No Missed Connections</Text>}
    />
  );
};

export default MissedConnections;