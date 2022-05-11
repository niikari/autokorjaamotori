import { Icon } from "@rneui/base";
import { Button } from "@rneui/themed";
import { ref, update } from "firebase/database";
import { useContext } from "react";
import { View,Text, ScrollView, FlatList, Dimensions, Image, ImageBackground, Pressable, Alert } from "react-native";
import NoPhoto from "../../assets/no_photo.png";
import userContext from "../../context/userContext";
import SendMessageButton from "./SendMessageButton";
import { db } from "../../firebase";
import { add } from "react-native-reanimated";

const screen = Dimensions.get("screen")

export default function Advert({ route, navigation }) {

    const { info } = route.params
    const { addId } = route.params
    const { state } = useContext(userContext)

    const addToFavorites = () => {
        update(
            ref(db, `users/${state.user.uid}`), {
                favorites: state.user?.favorites ? [...state.user.favorites, addId] : [addId] 
            }
        )
        .catch(err => Alert.alert("Hups!", "Jokin meni pieleen..."))
    }

    const isThisUsersFavorite = () => {
        if (state.user?.favorites) {
            if (state.user.favorites.includes(addId)) {
                return true
            }
        }
        return false
    }

    const RenderItem = (item) => {
        if (item === "nophotos") {
            return (
                <ImageBackground 
                    source={NoPhoto}
                    style={{
                        height: 300,
                        width: screen.width
                    }}
                    resizeMode="cover"
                >
                    <View style={{
                        flexDirection: "row",
                        marginTop: 30,
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginLeft: 10,
                        marginRight: 10
                    }}>
                        <Pressable style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="keyboard-backspace" />
                            <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", margin: 10, marginTop: 10, fontWeight: "bold" }}>Takaisin</Text>
                        </Pressable>
                        <Pressable style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            
                            <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", margin: 10, marginTop: 10, fontWeight: "bold" }}>{isThisUsersFavorite() ? "Suosikkisi" : "Suosikkeihin"}</Text>
                            {
                                isThisUsersFavorite() ? (
                                    <Icon name="favorite" color="red" />
                                )
                                :
                                (
                                    <Icon name="favorite" onPress={addToFavorites} />
                                )
                            }
                        </Pressable>
                        
                    </View>
                </ImageBackground>
            )
        }
    }

    return (
        <View style={{
            flex: 1,
            alignItems: "center"
        }}>
            <ScrollView style={{
                
            }}
                nestedScrollEnabled={true}
            >
                
                <FlatList
                    style={{
                        width: screen.width,
                        height: 300
                    }}
                    horizontal={true}
                    data={info.photos ? info.photos : ["nophotos"] }
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => RenderItem(item)}
                />
                <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", marginLeft: 10, fontWeight: "bold" }}>{info.department.toUpperCase()}</Text>
                <Text style={{ fontFamily: 'Dosis', fontSize: 30, textAlign: "left", margin: 10, fontWeight: "bold" }}>{info.header}</Text>
                <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", margin: 10, marginTop: 10, fontWeight: "bold" }}>HINTA: {info.price}</Text>
                <View style={{
                    flexDirection: "row",
                    margin: 10,
                    alignItems: "center"
                }}>
                    <Icon name="event" />
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", margin: 10, marginTop: 10, fontWeight: "bold" }}>
                        {new Date(info.date).getDate().toLocaleString()}.{new Date(info.date).getMonth() + 1}.{new Date(info.date).getFullYear()} klo {new Date(info.date).getHours()}:{new Date(info.date).getMinutes()}
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row"
                }}>
                    <Pressable style={{
                        flexDirection: "row",
                        margin: 10,
                        marginTop: -10,
                        alignItems: "center"
                        
                    }}
                        onPress={() => navigation.navigate("onmap", {
                            place: info.place
                        })}
                    >
                        <Icon name="place" />
                        <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", margin: 10, marginTop: 10, fontWeight: "bold" }}>
                            {info.place.street}, {info.place.postCode} {info.place.city}
                        </Text>
                    </Pressable>
                </View>
                <View style={{
                    width: '80%',
                    borderTopColor: 'grey',
                    borderTopWidth: 1,
                    margin: 'auto'
                }} />
                <View>
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", margin: 10, marginTop: 10, fontWeight: "bold" }}>Kuvaus: {info.discription}</Text>
                </View>
                <View style={{
                    width: '80%',
                    borderTopColor: 'grey',
                    borderTopWidth: 1,
                    margin: 'auto'
                }} />
                <View>
                    <Text style={{ fontFamily: 'Dosis', fontSize: 20, textAlign: "left", margin: 10, marginTop: 10, fontWeight: "bold" }}>Ilmoittaja:</Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <View>
                            <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", fontWeight: "bold" }}>{info.place.oy}</Text>
                            <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", fontWeight: "bold" }}>Toimipiste: {info.place.name}</Text>
                            <Text style={{ fontFamily: 'Dosis', fontSize: 15, textAlign: "left", fontWeight: "bold" }}>Puhelin: {info.place.phone}</Text>
                        </View>
                        <Icon name="house" size={60} />
                    </View>
                </View>
            </ScrollView>
            <View style={{
                margin: 5
            }}>
                {
                    state.user ? (state.user.uid !== info.userId ? (
                        <SendMessageButton addId={addId} info={info} userId={state.user.uid} email={state.user.email} />
                        ) 
                        :
                        <Text></Text>
                    )
                    :
                    (
                        <Button 
                            title="Kirjaudu viestittääksesi"
                            disabled
                            type="clear"
                            iconPosition="right"
                            icon={
                                <Icon name="message" color="lightblue" />
                            }
                        />
                    )
                }
            </View>
        </View>
    )
}