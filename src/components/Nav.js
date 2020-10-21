import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize"

//importing screens
import BerandaScreen from '../screens/beranda.js'
import EdukasiScreen from '../screens/edukasi.js'
import AktivitasScreen from '../screens/aktivitas.js'
import ProfilScreen from '../screens/profil.js'

//importing theme
import theme from '../style/theme.js'

const BottomTab = createBottomTabNavigator()

export const BottomTabComponent = () => {
    return (
        <BottomTab.Navigator
            initialRouteName="Beranda"
            lazy={false}
            tabBarOptions={{
                activeTintColor: theme.PRIMARY_DARK_COLOR,
                labelStyle: {fontSize: RFValue(11)},
            }}
            resetOnBlur={false} >
            <BottomTab.Screen 
                name="Beranda" component={BerandaScreen} 
                options={{
                    tabBarIcon: ({ color }) => <MCIcon name="home" style={{marginTop: 9}} color={color} size={32} />
                }}/>
            <BottomTab.Screen 
                name="Edukasi" component={EdukasiScreen} 
                options={{
                    tabBarIcon: ({ color }) => <MCIcon name="book-open-page-variant" style={{marginTop: 5}} color={color} size={30} />
                }}/>
            <BottomTab.Screen 
                name="Aktivitas" component={AktivitasScreen} 
                options={{
                    tabBarIcon: ({ color }) => <IonIcon name="document-text-sharp" style={{marginTop: 9}} color={color} size={28} />
                }}/>
            <BottomTab.Screen 
                name="Profil" component={ProfilScreen} 
                options={{
                    tabBarIcon: ({ color }) => <IonIcon name="person" style={{marginTop: 9}} color={color} size={28} />
                }}/>
        </BottomTab.Navigator>
)}