import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { View, ImageBackground, Text, Dimensions, TouchableOpacity, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import { db } from "../../firebase";
import { onValue, ref, update } from "firebase/database";
import { Icon, ListItem, Avatar, Button, Dialog, Input, Switch  } from "@rneui/themed";
import NoPhoto from "../../assets/no_photo.png";
import * as Location from'expo-location';

const screen = Dimensions.get("screen")

const debs = ([
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

export default function AllAdverts({ navigation }) {

    const { state } = useContext(userContext)
    const [adds, setAdds] = useState([])
    const [myPosition, setMyPosition] = useState(null)

    // DIALOG
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState({
        nearest: false,
        byTime: false,
        sentence: ''
    })

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

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert('Emme saaneet lupaa sijaintiisi, tämä vaikeuttaa suodattamista')
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setMyPosition(location)
        })()
    })

    useEffect(() => {
        onValue(
            ref(db, 'adverts'), (snapshot) => {
                const data = snapshot.val()
                setAdds(Object.entries(data))
            }
        )
    }, [])

    const updateCountOnAdd = (id, info) => {
        update(
            ref(db, `adverts/${id}`), {
                clicked: info?.clicked ? info.clicked + 1 : 1
            }
        )
        .catch(err => Alert.alert("Hups!", "Jokin meni pieleen..."))
    }

    const isAddOnUsersFavorites = (id) => {
        if (state.user?.favorites) {
            if (state.user.favorites.includes(id)) {
                return true
            }
        }
        return false
    }

    const handleChange = (txt) => {
        
    }

    const RenderItem = (item) => {
        const id = item[0]
        const info = item[1]
        
        if (info?.visibility !== false) {        

            return (
                <ListItem style={{
                    opacity: 0.8,
                    
                }}>
                    <Avatar 
                        // rounded
                        source={info.photos ? { uri: info.photos[0] } : NoPhoto }
                        size={80}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{info.department}</ListItem.Title>
                        <ListItem.Title>{info.header} {isAddOnUsersFavorites(id) && <Icon name="favorite" color="red" /> } </ListItem.Title>                    
                        <ListItem.Subtitle>Hinta: {info.price}</ListItem.Subtitle>
                        <ListItem.Subtitle>{info.place.city}</ListItem.Subtitle>
                        <ListItem.Subtitle><Button title="Kartalla" onPress={() => navigation.navigate("onmap", {place: info.place})} type="clear" titleStyle={{ fontFamily: 'Dosis', color: "black" }} iconPosition="right" icon={<Icon name="map" />} /></ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron 
                        size={50}
                        color="black"
                        onPress={() => {
                            updateCountOnAdd(id, info)
                            navigation.navigate("advert", {
                                addId: id,
                                info: info
                            })
                        }}
                    />
                </ListItem>
            )
        }
    }
//updateCountOnAdd
    const ListSeperator = () => {
        return (
            <View style={{
                height: 5
            }}/>
        )
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
                        ILMOITUKSET
                    </Text>
                </View>
                
                {
                    adds.length > 0 ? (
                        <FlatList 
                            style={{
                                width: screen.width - screen.width * 0.1,
                                marginTop: 20
                            }}
                            data={adds}
                            keyExtractor={(item, index) => index}
                            renderItem={({item}) => RenderItem(item)}
                            ItemSeparatorComponent={ListSeperator}
                        />
                    )
                    :
                    (
                        <View>
                            <Text>Ei vielä ilmoituksia</Text>
                        </View>
                    )
                }

                <TouchableOpacity
                    style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.99)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    bottom: 10,
                    right: 250,
                    height: 70,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                    opacity: 0.8
                    }}
                    onPress={() => setVisible(!visible)}
                >
                    <Icon name='search' size={30} color='#01a699' />
                </TouchableOpacity>
                <Dialog 
                    isVisible={visible}
                    onBackdropPress={() => setVisible(!visible)}
                >
                    <Dialog.Title 
                        title="Aseta hakuehdot"
                        titleStyle={{ fontFamily: 'Dosis' }}
                    />
                    <Input
                        placeholder="Hakusana"
                        value={search.sentence}
                        onChangeText={txt => handleChange(txt)}
                    />
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <Text>Halvin ensin</Text>
                        {search.nearest ? (<Switch value={true} onPress={() => setSearch({...search, nearest: !search.nearest})} />) : (<Switch value={false} onPress={() => setSearch({...search, nearest: !search.nearest})}/>)}
                        
                    </View>
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "center" }}>Vain tietyltä osastolta?</Text>
                    {
                        debs.map((deb, index) => 
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}
                            key={index}
                        >
                            <Text>{deb.name}</Text>
                            <Switch />
                        </View> )
                    }
                    
                    <Dialog.Actions>
                        <Dialog.Button 
                            title="Ok"
                            onPress={() => setVisible(!visible)}
                        />
                    </Dialog.Actions>
                </Dialog>
            </ImageBackground>
            
        </View>
    )
}