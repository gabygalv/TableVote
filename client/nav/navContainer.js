
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';


import Vote from './screens/Vote.js';
import Party from './screens/Party.js';
import Profile from './screens/Profile.js';

const voteTab = 'Vote';
const partyTab = 'Party';
const profileTab = 'Profile';

const Tab = createBottomTabNavigator();

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={voteTab}
          screenOptions={ ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
          
              if (rn === voteTab) {
                iconName = focused ? 'thumbs-up' : 'thumbs-up-outline';
          
              } else if (rn === partyTab) {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
          
              } else if (rn === profileTab) {
                iconName = focused ? 'person' : 'person-outline';
              }
          
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ff9f1c',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {
              fontSize: 15,
            },
            tabBarStyle: {
              display: 'flex',
            },
          })}
        
        >

        <Tab.Screen
          name={voteTab}
          component={Vote}
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert('Your vote has been submitted')}
                title="Submit"
                color="#ff9f1c"
              />
            ),
          }}
        />
        <Tab.Screen name={partyTab} component={Party} />
        <Tab.Screen name={profileTab} component={Profile} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default NavContainer;