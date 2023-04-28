import {React, useState, useEffect} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NavContainer from './nav/navContainer.js';
import AuthScreen from './login/authScreen.js';
import UserContext from './UserContext.js';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const [yelpData, setYelpData] = useState(null); 

  console.log(isLoggedIn)

  useEffect(() => {
    fetch("http://127.0.0.1:5555/check_session")
      .then((r) => {
        if (r.ok) {
          r.json()
          .then((currentUser) => setIsLoggedIn(currentUser)
          )}
      });
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, yelpData, setYelpData }}>
    {isLoggedIn? <NavContainer isLoggedIn={isLoggedIn}/> : <AuthScreen/>}
  </UserContext.Provider>
  );
}

{/* //   <LoginSignupPage />
//   <NavBar>
//     <VotePage />
//     <PartyPage>
//       <CreatePartyForm />
//       <ActiveParty>
//         <RestaurantCards />
//         <VoteForm />
//         <CompletedParty />
//       </ActiveParty>
//     </PartyPage>
//     <ProfilePage />
   </NavBar> */}

