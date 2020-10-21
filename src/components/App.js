import * as React from 'react'
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
import { RFValue } from "react-native-responsive-fontsize"
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

//importing components
import { BottomTabComponent } from './Nav.js'
import AuthComponent from '../screens/auth.js'

//importing style
import styles from '../style'

//importing context
import { GlobalContext } from './Context.js'

//importing images
import splashImage from '../assets/images/launch_screen.png'

//importing theme
import theme from '../style/theme.js'

GoogleSignin.configure({
  webClientId: '859410368729-dg3i9baknbcj7s9mcntu9ia0i71juga1.apps.googleusercontent.com',
})

export default () => {
  const globalReducer = (prevState, action) => {
    switch( action.type ) {
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          userInfo: null,
          isLoading: false,
        };
      case 'LOADING':
        return {
          ...prevState,
          isLoading: true,
        }
      case 'STOP LOADING':
        return {
          ...prevState,
          isLoading: false,
        }
      case 'SET INFO':
        return {
          ...prevState,
          userInfo: action.info
        }
      case 'ENABLE LOCATION':
        return {
          ...prevState,
          locationEnabled: true
        }
  }}

  const [globalState, dispatch] = React.useReducer(globalReducer, 
    {
      isLoading: true,
      userToken: null,
      userInfo: null,
      locationEnabled: false
  })

  const globalContext = React.useMemo( () => ({
    _signIn: async () => {
      try {
        dispatch({type: 'LOADING'})

        // Get the users ID token
        const userInfo = await GoogleSignin.signIn()
        const { idToken } = await GoogleSignin.signIn()

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

        //Setting the userInfo
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo) )
        dispatch({type: 'SET INFO', info: userInfo})

        console.log("SUCCESSFULLY LOGGED IN")
        console.log(userInfo)

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential)
      } catch (e) {
        dispatch({type: 'STOP LOADING'})
        console.log("ERROR IN LOGGING IN: " + e)
      }
    },
    _logOut: async () => {
        dispatch({type: 'LOADING'})
        try {
          await AsyncStorage.removeItem('userInfo')
          auth().signOut()
            .then( () => {
              dispatch({type: 'LOGOUT'})
              console.log("USER SUCCESFULLY LOGGED OUT") })
            .catch( err => {
              dispatch({type: 'STOP LOADING'})
              console.log("ERROR IN LOGGING OUT: " + e) 
            })
        } catch (e) {
          dispatch({type: 'STOP LOADING'})
          console.log("ERROR IN LOGGING OUT: " + e) 
        }
    },
    globalState
  }), [globalState])

  const onAuthStateChanged = async (userToken) => {
    var userInfo = null
    try {
      userInfo = await AsyncStorage.getItem('userInfo')
      if (userInfo) {
        dispatch({type: 'SET INFO', info: JSON.parse(userInfo)})
        dispatch({type: 'LOGIN', token: userToken})
      } else dispatch({type: 'STOP LOADING'})
    } catch (e) {
      dispatch({type: 'STOP LOADING'})
      console.log("ERROR RETRIEVING USER INFO OR USER TOKEN: " + e) 
    }
  }

  const requestLocationPermission = () => {
    return new Promise ( async (resolve, reject) => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "JaKi",
            message:
              "Aplikasi asisten masyarakat dalam program zero accident",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location")
          resolve()
        } else {
          console.log("ERROR IN LOCATION PERMISSION: location permission denied")
          reject()
        }
      } catch (err) {
        console.log("ERROR IN LOCATION PERMISSION:" + err)
        reject()
      }
    }) 
  }

  const enableLocation = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      .then(data => {
        console.log("LOCATION ENABLED: " + data)
        dispatch({type: 'ENABLE LOCATION'})
      }).catch(err => {
        console.log("LOCATION ENABLED ERROR: " + err.message)
      })
  }


  React.useEffect( () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    requestLocationPermission()
      .then( () => enableLocation() )
    SplashScreen.hide()
    
    return subscriber
  }, [])

  if (globalState?.isLoading) return(
    <ImageBackground source={splashImage} style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="white" style={{position: 'absolute', bottom: theme.DEVICE_HEIGHT*0.15}}/>
    </ImageBackground>
  )
  else return(
    <GlobalContext.Provider value={globalContext}>
    {(!globalState?.userToken)
      ? <AuthComponent/>
      : <NavigationContainer>
          <BottomTabComponent/>
        </NavigationContainer>}
    </GlobalContext.Provider>
  )
}