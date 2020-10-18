import * as React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"

//importing styles
import styles from '../style'

//importing context
import { AuthContext } from '../components/Context.js'

//importing images
import splashImage from '../assets/images/launch_screen.png'
import googleIcon from '../assets/images/googleLogo.png'

//importing theme
import theme from '../style/theme.js'

export default () => {
    const { _signIn } = React.useContext(AuthContext)

    return(
        <ImageBackground source={splashImage} style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <View style={{position: 'absolute', bottom: theme.DEVICE_HEIGHT*0.15}}>
                <TouchableOpacity onPress={_signIn} style={[styles.button, {backgroundColor: 'white'} ]}>
                    <Image source={googleIcon} style={[styles.iconSize, {marginRight: RFValue(25) } ]} />
                    <Text style={styles.buttonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>)
}