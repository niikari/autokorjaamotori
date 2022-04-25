import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { View, ImageBackground, Text, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { Icon, ListItem, Avatar, Button } from "@rneui/themed";
import NoPhoto from "../../assets/no_photo.png";

const screen = Dimensions.get("screen")

export default function AllAdverts({ navigation }) {

    const { state } = useContext(userContext)
    const [adds, setAdds] = useState([])

    useEffect(() => {
        onValue(
            ref(db, 'adverts'), (snapshot) => {
                const data = snapshot.val()
                setAdds(Object.entries(data))
            }
        )
    }, [])

    const RenderItem = (item) => {
        const id = item[0]
        const info = item[1]
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
                    <ListItem.Title>{info.header}</ListItem.Title>                    
                    <ListItem.Subtitle>Hinta: {info.price}</ListItem.Subtitle>
                    <ListItem.Subtitle>{info.place.city}</ListItem.Subtitle>
                    <ListItem.Subtitle><Button title="Kartalla" onPress={() => navigation.navigate("onmap", {place: info.place})} type="clear" titleStyle={{ fontFamily: 'Dosis', color: "black" }} iconPosition="right" icon={<Icon name="map" />} /></ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                    size={50}
                    color="black"
                    onPress={() => navigation.navigate("advert", {
                        addId: id,
                        info: info
                    })}
                />
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

            </ImageBackground>
            
        </View>
    )
}