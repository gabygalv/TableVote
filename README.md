
## Description![TableVote: For the group that just can't pick a place to eat 🍽️](https://github.com/gabygalv/TableVote/assets/121903203/9576abd2-d864-4dd8-aed2-e0325d58d04f)

Have you ever struggled to decide where to go for a meal with your friends or family? Do you wish there was a simple and fun way to find the best restaurants near you that match your preferences and budget? If so, then TableVote is the app for you!

TableVote is an app that allows you to create a party and pick a place to eat. When you start a party, you can pick a location, price range, search terms, invite other users, and a search radius in miles. Then you can head to the voting section and view a selection of 20 bars/restaurants (provided by Yelp's API) that fit your search criteria. Every user in the party can vote on where they want to dine. They can also click on the restaurant to view more details on Yelp. Once all users have voted, the app will select a winning location based on votes (if there's a tie, the program will select a random choice from the votes). In their profile, users can view past parties and the selected restaurants as well as a list of missed connections, which are restaurants they voted for but did not get picked in a selected party.

TableVote is a project that I built for my final assignment at Flatiron School. I wanted to create an app that solves a common problem that many people face when planning a social outing. I also wanted to learn how to use React Native and Yelp's API to create a mobile app that is user-friendly and interactive.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Installation
To install TableVote, you need to have Node.js and Expo CLI installed on your machine. You also need to clone this repository from GitHub (server-deployed branch):
```bash
git clone https://github.com/gabygalv/TableVote/tree/server-deployed
```
Then, navigate to the client directory and install the dependencies:

```bash
cd client
npm install
```

Finally, start the app with Expo:

```bash
npx expo start
```

This will open a page with a QR code that you can scan with your phone using the Expo Go app. Alternatively, you can run the app on an emulator or simulator.

## Usage
To use TableVote, you need to sign up with a phone number, password, and username or log in with an existing account. Then, you can create a new party by filling out the form with your preferences. You can also invite other users by entering their usernames or sharing your party code via SMS. Once you create a party, you will be redirected to the voting screen where you can see the list of restaurants and vote for your favorite one. You can view the restaurant's yelp page by clicking on the restaurant card. When all users have voted, the app will display the winning restaurant with additional information about it and you can send a group message to everryone in your party letting them know the decided upon restaurant. You can also see the history of your parties and restaurants you've voted for in past parties in your profile screen.

## Credits
TableVote was created by Gabriela Galvan as part of the Flatiron School Full-Stack Engineering Program. The app uses the following technologies:

- React Native: A framework for building native apps using React.
- Yelp Fusion API: An API that allows developers to access Yelp's data on local businesses such as restaurants, bars, cafes, etc.
- React Native Elements: A cross-platform UI toolkit for React Native.
- Expo-SMS: A library that provides access to the system's UI/app for sending SMS messages.
- React Navigation: A library that provides routing and navigation for React Native apps.

### Login/Signup
<img src="https://github.com/gabygalv/TableVote/assets/121903203/e803cb17-e54c-46d8-8df4-a39094a2fd4e?raw=true&sanitize=true" width="400" height="auto"/>

<img src="https://github.com/gabygalv/TableVote/assets/121903203/a4513503-e20c-433e-9356-8191d48daca0?raw=true&sanitize=true" width="400" height="auto"/>

### Start/Join a party
<img src="https://github.com/gabygalv/TableVote/assets/121903203/d619d08a-8226-4082-9ab7-3d1847a07c3c?raw=true&sanitize=true" width="400" height="auto"/>

<img src="https://github.com/gabygalv/TableVote/assets/121903203/920e4529-1ddb-46fc-ba1c-175db8b8e6d1?raw=true&sanitize=true" width="400" height="auto"/>

### Vote and invite users using your party code
![voting](https://github.com/gabygalv/TableVote/assets/121903203/102c505f-1405-48b5-9859-060459cdaa21)

### View winner
<img src="https://github.com/gabygalv/TableVote/assets/121903203/262d94c2-6edd-4142-832a-ffe2fd46a115?raw=true&sanitize=true" width="500" height="auto"/>
![view winner](https://github.com/gabygalv/TableVote/assets/121903203/33aaa384-9c41-4e40-8357-7cfbc8dd0dcf)


### Profile Tab
<img src="https://github.com/gabygalv/TableVote/assets/121903203/a515f8e0-2b79-49de-847c-f5a25f2ef1b2?raw=true&sanitize=true" width="500" height="auto"/>




