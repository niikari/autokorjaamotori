import { Button, CheckBox, Icon, Input } from "@rneui/themed";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, ScrollView, Dimensions, TextInput } from "react-native";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import CreateAndSaveButton from "./CreateAndSaveButton";
import Kamera from "./Kamera";
import SwipePhotos from "./SwipePhotos";

const screen = Dimensions.get("screen")

export default function Create({ navigation, route }) {

    const [photos, setPhotos] = useState(["rendercamera"])
    const { state } = useContext(userContext)
    const [places, setPlaces] = useState([])
    const [header, setHeader] = useState('')
    const [price, setPrice] = useState('')
    const [discription, setDiscription] = useState('')
    const [debs, setDebs] = useState([
        {
            name: "Myydään",
            selected: false,
            disabled: false
        },
        {
            name: "Ostetaan",
            selected: false,
            disabled: false
        },
        {
            name: "Vaihdetaan",
            selected: false,
            disabled: false
        },
        {
            name: "Vuokrataan",
            selected: false,
            disabled: false
        },
        {
            name: "Annetaan",
            selected: false,
            disabled: false
        }
    ])

    const initialize = () => {
        setPhotos(["rendercamera"])
        setDebs(debs.map(deb => ({...deb, selected: false, disabled: false})))
        setPlaces(places.map(place => ({...place, selected: false, disabled: false})))
        setHeader('')
        setDiscription('')
        setPrice('')
    }

    const addPhoto = (photo) => {
        setPhotos(photos => [photo, ...photos])
    }

    useEffect(() => {
        if (route.params?.photo) {
            addPhoto(route.params.photo)
        }
    } ,[route.params?.photo])

    useEffect(() => {
        if (state.user?.places)
        setPlaces(state.user.places.map(place => ({...place, selected: false, disabled: false})))
    },[state.user?.places])

    const selectPlace = (i) => {
        setPlaces(places.map((place, index) => index === i ? ({...place, selected: !place.selected}) : ({...place, disabled: !place.disabled}) ))
    }

    const selectDeb = (i) => {
        setDebs(debs.map((deb, index) => index === i ? ({...deb, selected: !deb.selected}) : ({...deb, disabled: !deb.disabled}) ))
    }

    return (
        <View style={{
            flex :1,
        }}>
            <ImageBackground
                source={BackgroundImage}
                resizeMode="cover"
                style={{
                    flex: 1,
                    alignItems: "center"
                }}
            >
                <View style={{
                    flexDirection: "row",
                    marginTop: 60,
                    justifyContent: "space-around"
                }}>
                    
                    <Text
                        style={{
                            fontFamily: 'Dosis',
                            textAlign: "center",
                            color: "white",
                            fontSize: 40,
                        }}
                    >
                        LUO ILMOITUS
                    </Text>
                </View>
                <ScrollView style={{
                    width: screen.width - screen.width * 0.2,
                    marginTop: 30
                }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        state.user.places ? (
                            <View>
                                <Input 
                                    placeholder="Tuote"
                                    inputContainerStyle={{
                                        // backgroundColor: "white",
                                        // opacity: 0.8
                                    }}
                                    label="Ilmoituksen otsikko"
                                    containerStyle={{
                                        backgroundColor: "white",
                                        borderRadius: 20
                                    }}
                                    value={header}
                                    onChangeText={txt => setHeader(txt)}
                                />
                                <SwipePhotos photos={photos} addPhoto={addPhoto} navigation={navigation} />
                                <Input 
                                    placeholder="Vapaasti kirjoittamalla"
                                    inputContainerStyle={{
                                        // backgroundColor: "white",
                                        // opacity: 0.8
                                    }}
                                    label="Hinta"
                                    containerStyle={{
                                        backgroundColor: "white",
                                        borderRadius: 20,
                                        marginBottom: 5
                                    }}
                                    value={price}
                                    onChangeText={txt => setPrice(txt)}
                                />
                                <TextInput
                                    multiline={true}
                                    numberOfLines={8}
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: 20,
                                        padding: 5
                                    }}
                                    placeholder="Tarkempi kuvaus tuotteesta..."
                                    textAlignVertical="top"
                                    value={discription}
                                    onChangeText={txt => setDiscription(txt)}
                                />
                                <View>
                                    <Text style={{ fontFamily: 'Dosis', textAlign: "center", fontSize: 20 }}>Mihin osastoon sijoittaisit ilmoituksen</Text>
                                    {
                                        debs.map((deb, index) => 
                                        <CheckBox key={index} title={deb.name} checked={deb.selected} disabled={deb.disabled} onPress={() => selectDeb(index)} /> )
                                    }
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Dosis', textAlign: "center", fontSize: 20 }}>Valitse ilmoittava toimipiste</Text>
                                    {
                                        places.map((place, index) => 
                                        <CheckBox key={index} title={place.name} checked={place.selected} disabled={place.disabled} onPress={() => selectPlace(index)} /> )
                                    }
                                </View>
                                <CreateAndSaveButton price={price} initialize={initialize} userId={state.user.uid} photos={photos.filter(photo => photo !== "rendercamera")} discription={discription} header={header} debs={debs.filter(deb => deb.selected)} places={places.filter(place => place.selected)} />
                            </View>
                            
                        ):
                        (
                            <View>
                                <Text style={{ fontFamily: 'Dosis', color: "white", fontSize: 25, textAlign: "center" }}>Lisää yritys profiilisi asetuksista luodaksesi ilmoituksia</Text>
                            </View>
                        )
                    }
                    
                </ScrollView>
            </ImageBackground>
            
        </View>
    )
}