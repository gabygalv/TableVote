import React, { useContext, useState } from 'react';
import {View, Text, StatusBar, TextInput, Button} from 'react-native'
import UserContext from '../../UserContext.js';
import PartyForm from '../../components/partyform.js';
import PartyCard from '../../components/partycard.js';

export default function Party() {
  return(
    <>
    
    <PartyForm/>   
    </>
)}

