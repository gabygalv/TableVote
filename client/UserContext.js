import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: null,
    yelpData: null
    

});

export default UserContext;