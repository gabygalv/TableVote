import React, { useContext, useState } from 'react';
import {View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import UserContext from '../../UserContext.js';
import PastParties from '../../components/pastparties.js';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MissedConnections from '../../components/missed.js';



export default function Profile() {
  const {isLoggedIn, setIsLoggedIn, loggedInParties, setMissed, missed} = useContext(UserContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [missedCollapsed, setMissedCollapsed] = useState(true);
  const handleMissed = async () => {
    if (missed === null) {
      try {
        const response = await fetch(`http://127.0.0.1:5555//users/${isLoggedIn.id}/missed`);
        const data = await response.json();
        const restaurantIds = data;
        const restaurants = await Promise.all(restaurantIds.map(async (restaurantId) => {
          const restaurantResponse = await fetch(`http://127.0.0.1:5555/yelpsearchbyid/${restaurantId}`);
          return restaurantResponse.json();
        }));
        setMissed(restaurants);
        setMissedCollapsed(!missedCollapsed);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMissedCollapsed(!missedCollapsed);
    }
  };


  function handleLogout () {
    fetch('http://127.0.0.1:5555/logout', {
          method: 'DELETE'})
          .then((r) => {
            if (r.ok) {
              setIsLoggedIn(null)
            }
          })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {isLoggedIn.username}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={{ color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View >
      <TouchableOpacity style={styles.dropdown} onPress={handleToggle}  >
        <Text style={styles.orangeText}>Past Parties
        <Ionicons name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color="#FFBF69" />
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
      <ScrollView style={{ maxHeight: 450 }}>
        <View style={styles.content}>
          <PastParties loggedInParties={loggedInParties} />
        </View>
        </ScrollView>
      </Collapsible>
    </View>
      <View >
      <TouchableOpacity style={styles.dropdown} onPress={handleMissed}  >
        <Text style={styles.orangeText}>Missed Connections
        <Ionicons name={missedCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color="#FFBF69" />
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={missedCollapsed}>
      <ScrollView style={{ maxHeight: 450 }}>
        <View style={styles.content}>
          <MissedConnections loggedInParties={loggedInParties} />
        </View>
        </ScrollView>
      </Collapsible>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: StatusBar.currentHeight,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#2EC4B6',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  orangeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff9f1c',
  },
  logoutButton: {
    backgroundColor: '#2EC4B6',
    padding: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

