import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import Vote from './screens/Vote.js';
import Party from './screens/Party.js';
import Profile from './screens/Profile.js';
import RestaurantList from '../components/restaurantList.js';
import SelectWinner from '../components/selectWinner.js';

const voteTab = 'Vote';
const partyTab = 'Party';
const profileTab = 'Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const VoteStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name={'Choose a Party'} component={Vote} />
      <Stack.Screen name="RestaurantList" component={RestaurantList} />
      <Stack.Screen name="SelectWinner" component={SelectWinner} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Choose a Party'} component={Vote} />
      <Stack.Screen name="RestaurantList" component={RestaurantList} />
      <Stack.Screen name="SelectWinner" component={SelectWinner} />
    </Stack.Navigator>
  );
};

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={partyTab}
        screenOptions={({ route }) => ({
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

        <Tab.Screen name={voteTab} component={VoteStack} screenOptions={{ headerShown: false }}/>
        <Tab.Screen name={partyTab} component={Party} />
        <Tab.Screen name={profileTab} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;