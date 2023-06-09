import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import UserContext from '../UserContext';
import { Formik } from 'formik';


import TVLogo from '../assets/tvlogo.png'

export default function AuthScreen () {
    const {isLoggedIn, setIsLoggedIn, setLoggedInParties, setRefresh} = useContext(UserContext);
    const [login_email, setLoginEmail] = useState('');
    const [login_password, setLoginPassword] = useState('');
    const [signup_email, setSignupEmail] = useState('');
    const [signup_password, setSignupPassword] = useState('');
    const [signup_username, setSignupUsername] = useState('');
    const [signup, setSignup] = useState(false);

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
              fetch(`http://127.0.0.1:5555/users/${user.id}/parties`)
          .then((res) => res.json())
          .then((parties) => {
            setLoggedInParties(parties);
          });
            });
          }
        })
        .catch((error) => {
          alert('Username or password incorrect, try again')
          console.error(error);
        });
    }

    function handleSignup() {
      fetch('http://127.0.0.1:5555/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signup_email,
          password: signup_password,
          username: signup_username,
        }),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((user) => {
              setIsLoggedIn(user);
              fetch(`http://127.0.0.1:5555/users/${user.id}/parties`)
          .then((res) => res.json())
          .then((parties) => {
            setLoggedInParties(parties);
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
          {signup?
           <TextInput
            style={{ height: 40, 
                width: '80%', 
                borderColor: 'gray', 
                borderWidth: 1, 
                marginTop: 0,
                borderRadius: 5 }}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setSignupEmail(text)}
            value={signup_email}
          />
          :
          <TextInput
            style={{ height: 40, 
                width: '80%', 
                borderColor: 'gray', 
                borderWidth: 1, 
                marginTop: 0,
                borderRadius: 5 }}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setLoginEmail(text)}
            value={login_email}
          />}
          {signup ? 
          <TextInput
          style={{ height: 40, 
              width: '80%', 
              borderColor: 'gray', 
              borderWidth: 1, 
              marginTop: 10,
              borderRadius: 5  }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setSignupPassword(text)}
          value={signup_password}
        /> 
        :
          <TextInput
            style={{ height: 40, 
                width: '80%', 
                borderColor: 'gray', 
                borderWidth: 1, 
                marginTop: 10,
                borderRadius: 5  }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setLoginPassword(text)}
            value={login_password}
          />}

        {signup ? 
          <TextInput
          style={{ height: 40, 
              width: '80%', 
              borderColor: 'gray', 
              borderWidth: 1, 
              marginTop: 10,
              borderRadius: 5  }}
          placeholder="Username"
          onChangeText={(text) => setSignupUsername(text)}
          value={signup_username}
          autoCapitalize="none"
        /> 
        :
          null
          }

          {signup ? 
          <TouchableOpacity onPress={handleSignup} style={{ 
            backgroundColor: '#2EC4B6', 
            padding: 10, 
            marginTop: 20,
            borderRadius: 5  }}>
            <Text style={{ color: 'white' }}>Signup</Text>
          </TouchableOpacity>
          : 
          <TouchableOpacity onPress={handleLogin} style={{ 
            backgroundColor: '#FF9F1C', 
            padding: 10, 
            marginTop: 20,
            borderRadius: 5  }}>
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>}

          

          <TouchableOpacity 
          style={{ marginTop: 20,
        }}
        onPress={() => {handleSignup; setSignup(!signup)}}
          >
           {signup ? 
            <Text>Login instead?</Text>
           :  
           <Text>Don't have an account? Sign up here.</Text>}
          </TouchableOpacity>
        </View>
      );
    }