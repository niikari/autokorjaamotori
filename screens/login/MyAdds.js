import { Avatar, Button, Dialog, Icon, ListItem } from "@rneui/themed";
import { onValue, ref, remove, update } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { View, Text, ImageBackground, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import { db } from "../../firebase";
import NoPhoto from "../../assets/no_photo.png";

export default function MyAdds({ navigation }) {

    const { state } = useContext(userContext)
    const [myAdds, setMyAdds] = useState([])

    // DIALOG
    const [visible, setVisible] = useState(false)
    const [choosenId, setChoosenId] = useState('')

    useEffect(() => {
        onValue(
            ref(db, 'adverts'), (snapshot) => {
                const data = snapshot.val()
                // ENTRIES [0] == ID JA ENTRIES [1] ON ITSE ILMOITUS
                setMyAdds(Object.entries(data).filter(add => add[1].userId === state.user.uid))
            }
        )
    }, [])

    const hideAdd = (id) => {
        update(
            ref(db, `adverts/${id}`), {
                visibility: false
            }
        )
    }

    const cancelHideAdd = (id) => {
        update(
            ref(db, `adverts/${id}`), {
                visibility: true
            }
        )
    }

    const removeAdd = (id) => {
        remove(
            ref(db, `adverts/${id}`)
        )
        .then(() => {
            setChoosenId('')
            setVisible(!visible)
            Alert.alert("Ilmoituksesi poistettu onnistuneesti")
        })
        .catch(() => Alert.alert("Hups!", "Jokin meni pieleen..."))
    }

    const RenderItem = (item) => {
        const id = item[0]
        const info = item[1]
        return (
            <ListItem style={{
                opacity: info?.visibility === false ? 0.4 :  0.8,
                
            }}>
                <Avatar 
                    // rounded
                    source={info.photos ? { uri: info.photos[0] } : NoPhoto }
                    size={80}
                />
                <ListItem.Content>
                    <ListItem.Title>{info.department}</ListItem.Title>
                    <ListItem.Title>{info.header}</ListItem.Title>                    
                    <ListItem.Subtitle>Hinta: {info.price}</ListItem.Subtitle>
                    <ListItem.Subtitle>{info.place.city}</ListItem.Subtitle>
                    <ListItem.Subtitle><Button title="Kartalla" onPress={() => navigation.navigate("onmap", {place: info.place})} type="clear" titleStyle={{ fontFamily: 'Dosis', color: "black" }} iconPosition="right" icon={<Icon name="map" />} /></ListItem.Subtitle>
                </ListItem.Content>
                <View style={{
                    
                }}>
                    <View style={{
                        flexDirection: "row",
                        marginBottom: 20
                    }}>
                        {info?.visibility === false ? <Icon name="visibility" onPress={() => cancelHideAdd(id)} /> : <Icon name="visibility-off" onPress={() => {
                            hideAdd(id)
                            Alert.alert("Ilmoituksesi piilotettu!")
                        }} />}
                    </View>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Icon name="remove-circle" color="red" onPress={() => {
                            setChoosenId(id)
                            setVisible(!visible)
                        }} />
                    </View>
                </View>
            </ListItem>
        )
    }

    const ListSeperator = () => {
        return (
            <View style={{
                height: 5
            }}/>
        )
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <ImageBackground
                source={BackgroundImage}
                style={{
                    flex: 1
                }}
                resizeMode="cover"
            >
                <View style={{
                    flexDirection: "row",
                    marginTop: 60,
                    justifyContent: "space-around",
                    marginBottom: 40
                }}>
                    <Icon name="menu" color="white" size={50} onPress={() => navigation.openDrawer()} />
                    <Text
                        style={{
                            fontFamily: 'Dosis',
                            textAlign: "center",
                            color: "white",
                            fontSize: 40,
                        }}
                    >
                        ILMOITUKSENI
                    </Text>
                </View>
                <FlatList 
                    data={myAdds}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => RenderItem(item)}
                    ItemSeparatorComponent={ListSeperator}
                />
            <Dialog
                isVisible={visible}
                onBackdropPress={() => setVisible(!visible)}
            >
                <Dialog.Title title="Haluatko varmasti poistaa ilmoituksesi pysyvästi?" />
                <Dialog.Actions>
                    <Dialog.Button title="Haluan" titleStyle={{ color: "green" }} onPress={() => removeAdd(choosenId)} />
                    <Dialog.Button title="Peruuta" titleStyle={{ color: "red" }} onPress={() => {
                        setChoosenId('')
                        setVisible(!visible)
                    }} />
                </Dialog.Actions>
            </Dialog>              
            </ImageBackground>
        </View>
    )
}