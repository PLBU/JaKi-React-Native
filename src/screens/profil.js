import * as React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"

//importing context
import { GlobalContext } from '../components/Context.js'

//importing styles
import styles from '../style'

//importing theme
import theme from '../style/theme.js'

export default () => {
    const { _logOut, globalState } = React.useContext(GlobalContext)

    return (
        <View style={[styles.whiteView, {alignItems: 'center'}]}>
            <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, flex: 0.3, width: theme.DEVICE_WIDTH}} />
            <View style={[styles.bigCard, {marginTop: RFValue(-70), alignItems: 'center', justifyContent: 'center' }]}>
                <Image source={{uri: globalState?.userInfo.user.photo}} style={[styles.avatar, {margin: RFValue(10) }]}/>
                <Text style={styles.largeText}>Halo, {globalState?.userInfo.user.name}</Text>
                <Text style={[styles.mediumText, {color: 'gray'}]}>{globalState?.userInfo.user.email}</Text>
            </View>
            
            <TouchableOpacity onPress={_logOut} style={[styles.button, {position: 'absolute', bottom: RFValue(40) }]}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
        </View>)
}