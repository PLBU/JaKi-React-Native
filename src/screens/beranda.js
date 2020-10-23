import * as React from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from "react-native-responsive-fontsize"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Marker } from 'react-native-maps'
import firebase from '../firebase'

// Importing styles
import styles from '../style'

//importing context
import { GlobalContext } from '../components/Context.js'

//importing theme
import theme from '../style/theme.js'

//importing data
import { blackSpots } from '../data'

export default () => {
    const searchBar = React.useRef()
    const mapView = React.useRef()

    const { globalState } = React.useContext(GlobalContext)

    const [currentLocation, setCurrentLocation] = React.useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })
    const [marker, setMarker] = React.useState(null)
    const [troubleSpots, setTroubleSpots] = React.useState([])

    const getAllTroubleSpots = () => {
        const getTroublespots = firebase.functions().httpsCallable('getTroublespots')

        getTroublespots()
            .then(result => {
                console.log('GET TROUBLESPOTS BERHASIL: ')
                console.log(result.data)
                setTroubleSpots(result.data)
            })
            .catch(e => {
                console.log('ERROR DI GET ALL TROUBLESPOTS: ' + e)
            })
    }

    const addTroubleSpot = () => {
        const data = {
            author : "user",
            lat : Number(lat),
            lang : Number(lang),
            keterangan
        }
        const addTroublespot = firebase.functions().httpsCallable("addTroublespot")

        addTroublespot(data)
            .then(() => getAllTroubleSpots())
            .then(() => {
                setLat("")
                setLang("")
                setKeterangan("")
                console.log("Finish Fetching")
            })
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log("SUCCEED IN GEOLOCATION GET CURRENT POSITION: " + position.coords.longitude + " " + position.coords.latitude)
                const { longitude, latitude } = position.coords
                setCurrentLocation({
                    ...currentLocation,
                    longitude,
                    latitude
                })
            },
            err => {
                Alert.alert("Error", "Failed getting your current location, please try again")
                console.log("ERROR IN GEOLOCATION GET CURRENT POSITION: " + err.response)
            },
            {timeout: 20000, maximumAge: 1000})
    }

    const _renderRightButton = () => ( (searchBar.current?.isFocused() )
        ?
        <TouchableOpacity 
            onPress={ () => {searchBar.current?.clear(), setMarker(null) } } 
            style={{position: 'absolute', right: RFValue(10), height: RFValue(50), justifyContent: 'center', elevation: 5}}>
            <MCIcon name="close-circle" size={RFValue(25)} color={theme.PRIMARY_DARK_COLOR}/>
        </TouchableOpacity>
        : null
    )

    React.useEffect( () => {
        getCurrentLocation()
        getAllTroubleSpots()
        // getAllBlackSpots() 
    }, [globalState?.locationEnabled])

    return (currentLocation.latitude) 
        ? 
        <View style={styles.centeredView}>
            <MapView
                ref = {mapView}
                provider = {PROVIDER_GOOGLE}
                style = {{width: '100%', height: '100%'}}
                initialRegion = {currentLocation}
                region = {currentLocation}
                // onRegionChange={ (region) => setCurrentLocation(region)}
                showsUserLocation = {true}
                showsCompass = {false}
                showsMyLocationButton = {false}>
                {marker && <Marker coordinate={marker}/>}
                {troubleSpots.map( (value, index) =>
                    <Circle 
                        center = {{
                            latitude: value.lat,
                            longitude: value.lang
                        }}
                        key = {index}
                        radius = {200}
                        strokeWidth = {0}
                        fillColor = 'rgba(255, 255, 0, 0.3)'/>)
                }
                {blackSpots.map( (value, index) =>
                    <Circle 
                        center = {{
                            latitude: value.lat,
                            longitude: value.lang
                        }}
                        key = {index}
                        radius = {200}
                        strokeWidth = {0}
                        fillColor = 'rgba(0, 0, 0, 0.3)'/>)
                }
            </MapView>
            <View style={[styles.smallIconButton, {position: 'absolute', bottom: 15, right: 15, backgroundColor: 'white', opacity: 0.75}]}>
                <TouchableOpacity 
                    onPress={() => mapView.current?.animateToRegion(currentLocation, 1000) }>
                    <MaterialIcon name="my-location" size={RFValue(25)} color={theme.PRIMARY_DARK_COLOR}/>
                </TouchableOpacity>
            </View>
            <View style={{
                position: 'absolute',
                top: RFValue(15), 
                width: theme.DEVICE_WIDTH*0.9,
                height: theme.DEVICE_HEIGHT}}>
                <GooglePlacesAutocomplete
                    autoFillOnNotFound = {true}
                    fetchDetails = {true}
                    ref = {searchBar}
                    placeholder = 'Ketik lokasi tujuan anda'
                    onPress = {(data, details = null) => {
                        console.log("SEARCH RESULT")
                        console.log(details.geometry.location)
                        setMarker({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        })
                        mapView.current?.animateToRegion({
                            ...currentLocation,
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        }, 1000)
                    }}
                    styles = {{
                        textInputContainer: {
                            opacity: 0.8,
                        },
                        textInput: {
                            height: RFValue(50),
                            fontSize: RFValue(16),
                            borderColor: theme.PRIMARY_DARK_COLOR,
                            borderWidth: 1,
                        },
                        listView: {
                            color: theme.PRIMARY_DARK_COLOR, //To see where exactly the list is
                            opacity: 0.8,
                            position: 'absolute',
                            top: 50,
                        },
                    }}
                    renderRightButton = {_renderRightButton}
                    query = {{
                        key: 'AIzaSyAPILODgMAqUs6j-TwnnIOw0T4fcQ5UC1g',
                        language: 'id',
                    }}/>
            </View>
        </View>
        :
        <View style={styles.centeredView}>
            <ActivityIndicator size="large" color={theme.PRIMARY_DARK_COLOR}/>
        </View>
}