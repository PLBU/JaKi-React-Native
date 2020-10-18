import * as React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"

//importing context
import { AuthContext } from '../components/Context.js'

//importing styles
import styles from '../style'

//importing theme
import theme from '../style/theme.js'

export default () => {
    const { _logOut, authState } = React.useContext(AuthContext)

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, flex: 0.3, width: theme.DEVICE_WIDTH}} />
            <View style={[styles.bigCard, {marginTop: RFValue(-70), alignItems: 'center', justifyContent: 'center' }]}>
                <Image source={{uri: authState?.userInfo.user.photo}} style={[styles.avatar, {margin: RFValue(10) }]}/>
                <Text style={styles.largeText}>Halo, {authState?.userInfo.user.name}</Text>
                <Text style={[styles.mediumText, {color: 'gray'}]}>{authState?.userInfo.user.email}</Text>
            </View>
            
            <TouchableOpacity onPress={_logOut} style={[styles.button, {position: 'absolute', bottom: RFValue(40) }]}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
        </View>)
}