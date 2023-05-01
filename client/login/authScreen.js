import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import UserContext from '../UserContext';
import { useNavigation } from '@react-navigation/native';


import TVLogo from '../assets/tvlogo.png'

export default function AuthScreen () {
    // const navigation = useNavigation();
    const {isLoggedIn, setIsLoggedIn, setYelpData} = useContext(UserContext);
    const [login_email, setLoginEmail] = useState('');
    const [login_password, setLoginPassword] = useState('');
    console.log(isLoggedIn)

    function handleLogin() {
      fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login_email,
          password: login_password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((user) => {
              setIsLoggedIn(user);
              // navigation.navigate('Vote');
              fetch('http://127.0.0.1:5555/parties')
                .then((res) => res.json())
                .then((parties) => {
                  console.log(parties);
                  const activeParty = parties.find((party) => {
                    return (
                      party.user.id === user.id &&
                      !party.selected_restaurant_id
                    );
                  });
                  if (activeParty) {
                    const urlParams = new URLSearchParams({
                      location: activeParty.location,
                      radius: activeParty.radius,
                      term: activeParty.term,
                      price: activeParty.price,
                    });
                    const url = `http://127.0.0.1:5555/yelpsearch?${urlParams.toString()}`;
                    fetch(url).then((response) => {
                      setYelpData(response);
                    });
                  }
                });
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={TVLogo} style={{ height: '20%', width: '85%', resizeMode: 'contain' }} />
          <TextInput
            style={{ height: 40, 
                width: '80%', 
                borderColor: 'gray', 
                borderWidth: 1, 
                marginTop: 0,
                borderRadius: '5px' }}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setLoginEmail(text)}
            value={login_email}
          />
          <TextInput
            style={{ height: 40, 
                width: '80%', 
                borderColor: 'gray', 
                borderWidth: 1, 
                marginTop: 10,
                borderRadius: '5px'  }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setLoginPassword(text)}
            value={login_password}
          />
          <TouchableOpacity onPress={handleLogin} style={{ 
            backgroundColor: '#FF9F1C', 
            padding: 10, 
            marginTop: 20,
            borderRadius: '5px'  }}>
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
        //   onPress= {console.log('hello')} 
          style={{ marginTop: 20 }}>
            <Text>Don't have an account? Sign up here.</Text>
          </TouchableOpacity>
        </View>
      );
    }