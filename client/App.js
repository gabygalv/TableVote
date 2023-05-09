import {React, useState, useEffect} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NavContainer from './nav/navContainer.js';
import AuthScreen from './login/authScreen.js';
import UserContext from './UserContext.js';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const [yelpData, setYelpData] = useState(null); 
  const [loggedInParties, setLoggedInParties] = useState(null); 
  const [refresh, setRefresh] = useState(false); 
  const [currentParty, setCurrentParty] = useState(null); 
  const [winnerWinner, setWinnerWinner] = useState(null); 
  const [missed, setMissed] = useState(null); 

  console.log(isLoggedIn)

  useEffect(() => {
    fetch("http://127.0.0.1:5555/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((currentUser) => {
            setIsLoggedIn(currentUser);
            fetch(`http://127.0.0.1:5555/users/${currentUser.id}/parties`)
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
  </UserContext.Provider>
  );
}


