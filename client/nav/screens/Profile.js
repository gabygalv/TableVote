import React, { useContext } from 'react';
import {View, Text, StatusBar, TouchableOpacity, StyleSheet} from 'react-native'
import UserContext from '../../UserContext.js';
import PastParties from '../../components/pastparties.js';

export default function Profile() {
  const {isLoggedIn, setIsLoggedIn, loggedInParties} = useContext(UserContext);

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
      <View style={styles.content}>
        <Text style={styles.orangeText}>Past Parties</Text>
        <PastParties loggedInParties={loggedInParties} />
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

