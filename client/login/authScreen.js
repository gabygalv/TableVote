import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import UserContext from '../UserContext.js';
import { useNavigation } from '@react-navigation/native';


import TVLogo from '../assets/tvlogo.png'

export default function AuthScreen () {
    // const navigation = useNavigation();
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
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
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={TVLogo} style={{ height: '25%', width: '80%', resizeMode: 'contain' }} />
          <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: 0 }}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setLoginEmail(text)}
            value={login_email}
          />
          <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setLoginPassword(text)}
            value={login_password}
          />
          <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#cbf3f0', padding: 10, marginTop: 20 }}>
            <Text style={{ color: 'grey' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress= {console.log('hello')} style={{ marginTop: 20 }}>
            <Text>Don't have an account? Sign up here.</Text>
          </TouchableOpacity>
        </View>
      );
    }