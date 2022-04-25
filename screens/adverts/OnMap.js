import { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { API_KEY_LOCATION_API } from "../../config";
import MapView, { Marker } from "react-native-maps";

export default function OnMap({ navigation, route }) {

    const { place } = route.params
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
    })

    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    const mapMarker = useRef(null)

    useEffect(() => {
        fetchGeoLocation()
    }, [])

    const fetchGeoLocation = () => {
        fetch(`${url}${place.street},${place.city}&key=${API_KEY_LOCATION_API}`)
        .then(res => res.json())
        .then(data => setRegion({
            ...region,
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
        }))
        .catch(err => Alert.alert("Jokin meni pieleen..."))
    }

    return (
        <View style={{
            flex:1
        }}>
            <MapView
                style={{
                    flex: 1
                }}
                region={region}
            >
                <Marker 
                    title={place.name}
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}
                    description={place.street}
                    ref={mapMarker}
                />
            </MapView>
            
        </View>
    )
}