import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from "firebase";

//Setup for redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXUzXcMes1gcmTEAYeZ78ZFvyiiX_nHz4",
  authDomain: "insta-56ce4.firebaseapp.com",
  projectId: "insta-56ce4",
  storageBucket: "insta-56ce4.appspot.com",
  messagingSenderId: "105161589894",
  appId: "1:105161589894:web:776ccb65b2b70bcf76bd07",
  measurementId: "G-MP5D7TP7DD"
};
firebase.initializeApp(firebaseConfig)

// if(firebase.apps.length == 0) {
// }  

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from './components/auth/Landing';
import RegisterPage from './components/auth/Register';
import LoginPage from './components/auth/Login';
import MainScreen from './components/Main'
import  AddScreen  from './components/main/Add';

const Stack = createStackNavigator();



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading...</Text>
        </View>
      )
    }
    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterPage}  />
            <Stack.Screen name="Login" component={LoginPage}  />
          </Stack.Navigator>
  
  
      </NavigationContainer>
      
      )
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
     
     
    )
    
  }
}

export default App




