import {React, useState, useEffect} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NavContainer from './nav/navContainer.js';
import AuthScreen from './login/authScreen.js';
import UserContext from './UserContext.js';
import { LogBox, StatusBar } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs()  
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const [yelpData, setYelpData] = useState(null); 
  const [loggedInParties, setLoggedInParties] = useState(null); 
  const [refresh, setRefresh] = useState(false); 
  const [currentParty, setCurrentParty] = useState(null); 
  const [winnerWinner, setWinnerWinner] = useState(null); 
  const [missed, setMissed] = useState(null); 

  console.log(isLoggedIn)

  useEffect(() => {
    fetch("http://tablevote.onrender.com/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((currentUser) => {
            setIsLoggedIn(currentUser);
            fetch(`http://tablevote.onrender.com/users/${currentUser.id}/parties`)
              .then((res) => res.json())
              .then((parties) => {
                setLoggedInParties(parties);
              });
          });
        }
      });
  }, [refresh]);

  return (
    <UserContext.Provider value={{ isLoggedIn, 
    setIsLoggedIn, 
    yelpData, 
    setYelpData,
    loggedInParties, 
    setLoggedInParties,
    refresh, 
    setRefresh,
    currentParty,
    setCurrentParty,
    winnerWinner,
    setWinnerWinner, 
    missed, 
    setMissed }}>
    {isLoggedIn? <NavContainer isLoggedIn={isLoggedIn}/> : <AuthScreen/>}
    <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>

  </UserContext.Provider>
  );
}


