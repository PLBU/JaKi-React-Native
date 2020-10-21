import { StyleSheet } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"

//importing theme
import theme from './theme.js'

export default StyleSheet.create({
    //Views
    whiteView: {
        flex: 1,
        backgroundColor: 'white'
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    //Buttons
    smallIconButton: {
        width: RFValue(45), 
        height: RFValue(45),
        borderRadius: RFValue(50), 
        justifyContent: 'center', 
        alignItems: 'center',
        elevation: 5
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
        elevation: 0,
        width:theme.DEVICE_WIDTH*0.7,
        opacity: 0.3
    },
    //Texts
    buttonText: {
        fontSize: RFValue(15)
    },
    largeText: {
        fontSize: RFValue(20)
    },
    mediumText: {
        fontSize: RFValue(17)
    },
    //Sizes
    iconSize: {
        width: RFValue(20), height: RFValue(20)
    },
    avatar: {
        width: RFValue(100), height: RFValue(100), borderRadius: RFValue(50)
    },
    //Cards
    bigCard: {
        backgroundColor: 'white', 
        elevation: 5, 
        width: theme.DEVICE_WIDTH*0.8, 
        height: theme.DEVICE_WIDTH*0.6, 
        borderRadius: RFValue(25), 
    },
})