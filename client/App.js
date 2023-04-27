import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NavContainer from './nav/navContainer.js';
import Home from './nav/screens/Home.js';
import Party from './nav/screens/Home.js';
import Profile from './nav/screens/Home.js';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => <Text>Party</Text>,
      },
    },
    Party: {
      screen: Party,
      navigationOptions: {
        header: () => <Text>Party</Text>,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: () => <Text>Party</Text>,
      },
    },
  },
  {
    initialRouteName: 'Screen1',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <AppContainer />;
}

