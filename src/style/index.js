import { StyleSheet } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"

//importing theme
import theme from './theme.js'

export default StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.ACCENT_COLOR,
        padding: RFValue(15),
        borderRadius: RFValue(20),
        elevation: 5,
        width:theme.DEVICE_WIDTH*0.7,
    },
    disabledButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.ACCENT_COLOR,
        padding: RFValue(15),
        borderRadius: RFValue(20),
        elevation: 5,
        width:theme.DEVICE_WIDTH*0.7,
        opacity: 0.3
    },
    buttonText: {
        fontSize: RFValue(15)
    },
    largeText: {
        fontSize: RFValue(20)
    },
    mediumText: {
        fontSize: RFValue(17)
    },
    iconSize: {
        width: RFValue(20), height: RFValue(20)
    },
    avatar: {
        width: RFValue(100), height: RFValue(100), borderRadius: RFValue(50)
    },
    bigCard: {
        backgroundColor: 'white', 
        elevation: 5, 
        width: theme.DEVICE_WIDTH*0.8, 
        height: theme.DEVICE_WIDTH*0.6, 
        borderRadius: RFValue(25), 
    },
})