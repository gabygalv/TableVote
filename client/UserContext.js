import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: null,
    yelpData: null,
    loggedInParties: null,
    refresh: false,
    currentParty: null,
    winnerWinner: null
});

export default UserContext;