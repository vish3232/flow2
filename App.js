import React, { useEffect, useState, useMemo } from 'react'
import { Easing } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Rootreducer from './Redux/Rootreducer'
import thnkmiddleware from 'redux-thunk'
import Playlist from './Screens/Playlist';
import Subcategory from './Screens/Subcategory';
import Player from './Screens/Player';
import Home from './Screens/Home';
import SignInScreen from './AuthenticationScreens/SignInScreen';
import SignUpScreen from './AuthenticationScreens/SignUpScreen'
import jwt from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'
import AuthLoadingScreen from './AuthenticationScreens/AuthLoadingScreen';
import DrawerScreen from './ReusableComponents/DrawerScreen';
import Premium from './Screens/Premium';
import Blogs from './Screens/Blogs';
import EditProfile from './Screens/EditProfile';
import { getUserState } from './constant/storage'
import Webview from './Screens/WebView';
import { Modal } from 'react-native';
import Modal1 from './AuthenticationScreens/Modal';
import ForgotPassword from './AuthenticationScreens/ForgotPassword';
import { UserContext } from './AuthContext'
import ForgotPassword2 from './AuthenticationScreens/ForgotPassword2';
import PushNotification from "react-native-push-notification";

const store = createStore(Rootreducer, applyMiddleware(thnkmiddleware))
const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    checkPermission()
    getLoginData()
    getUserState().then((paymentStatus) => {
      setuser(JSON.parse(paymentStatus))
      setloading(false)
    });

    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

  }, [])


  const checkPermission = async () => {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        getToken();
      } else {
        requestPermission();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        console.log(fcmToken)
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const requestPermission = async () => {
      try {
        await messaging().requestPermission();
        getToken();
      } catch (error) {
        console.log('permission rejected');
      }
  }

  const [loading, setloading] = useState(true)
  const [user, setuser] = useState(0)

  const authFlow = useMemo(() => ({
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('token')
        setuser(0)
        setloading(false)
      } catch (error) {
        setuser(0)
        setloading(false)
      }
    },
    logIn: async () => {
      try {
        setuser(1)
        setloading(false)
      } catch (error) {

      }
    }
  }), [user])

  const openAndCloseConfig = {
    animation: 'timing',
    config: {
      duration: 16.66,
      easing: Easing.linear
    }
  }

  const getLoginData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value === null) {
        setInterval(() => {
          setuser(0)
          setloading(false)
        }, 500);
      } {
        var decoded = jwt(value);
        expirationDate = new Date(decoded.exp * 1000);
        currentDate = new Date()
        setInterval(() => {
          if (expirationDate > currentDate) {
            setuser(1)
            setloading(false)
          } else {
            setuser(0)
            setloading(false)
          }
        }, 500);
      }
    } catch (error) {
      setuser(0)
      setloading(false)
    }
  }


  return (
    <UserContext.Provider value={authFlow}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              transitionSpec: {
                open: openAndCloseConfig,
                close: openAndCloseConfig
              },
            }}>
            {
              loading === true ? <Stack.Screen name="loading" component={AuthLoadingScreen} /> :
                user === 0 ?
                  <>
                    <Stack.Screen name="SignInScreen" component={SignInScreen} />
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} />
                    <Stack.Screen name="Modal" component={Modal1} />
                  </> :
                  <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Player" component={Player} />
                    <Stack.Screen name="Playlist" component={Playlist} />
                    <Stack.Screen name="Subcategory" component={Subcategory} />
                    <Stack.Screen name="Premium" component={Premium} />
                    <Stack.Screen name="Blogs" component={Blogs} />
                    <Stack.Screen name="Profile" component={DrawerScreen} />
                    <Stack.Screen name="Webview" component={Webview} />
                  </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </UserContext.Provider>
  );
}

export default App

