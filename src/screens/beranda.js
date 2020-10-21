import * as React from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from "react-native-responsive-fontsize"

// Importing styles
import styles from '../style'

//importing context
import { GlobalContext } from '../components/Context.js'

//importing theme
import theme from '../style/theme.js'

export default () => {
    var _mapView: MapView
    const { globalState } = React.useContext(GlobalContext)

    const [currentLocation, setCurrentLocation] = React.useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })

    React.useEffect( () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log("SUCCEED IN GEOLOCATION GET CURRENT POSITION: " + position)
                const { longitude, latitude } = position.coords
                setCurrentLocation({
                    ...currentLocation,
                    longitude,
                    latitude
                })
            },
            err => console.log("ERROR IN GEOLOCATION GET CURRENT POSITION" + err),
            {timeout: 20000, maximumAge: 1000})
    }, [globalState?.locationEnabled])

    return (currentLocation.latitude) 
        ? 
        <View style={styles.centeredView}>
            <MapView
                ref = {(mapView) => { _mapView = mapView }}
                provider={PROVIDER_GOOGLE}
                style={{width: '100%', height: '100%'}}
                initialRegion={currentLocation}
                region={currentLocation}
                // onRegionChange={ (region) => setCurrentLocation(region)}
                showsUserLocation
                />
            <View style={[styles.smallIconButton, {position: 'absolute', bottom: 15, right: 15, backgroundColor: 'white', opacity: 0.75}]}>
                <TouchableOpacity 
                    onPress={() => _mapView.animateToRegion(currentLocation, 1000) }>
                    <MaterialIcon name="my-location" size={RFValue(25)} color={theme.PRIMARY_DARK_COLOR}/>
                </TouchableOpacity>
            </View>
        </View>
        :
        <View style={styles.centeredView}>
            <ActivityIndicator size="large" color={theme.PRIMARY_DARK_COLOR}/>
        </View>
}