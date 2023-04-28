import {React, useState} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NavContainer from './nav/navContainer.js';
import AuthScreen from './login/authScreen.js';
import UserContext from './UserContext.js';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  console.log(isLoggedIn)

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
    {isLoggedIn? <NavContainer isLoggedIn={isLoggedIn}/> : <AuthScreen/>}
   

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

  </UserContext.Provider>
  );
}

