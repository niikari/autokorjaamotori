import { Avatar, Button, Icon } from "@rneui/themed";
import { View, ImageBackground, Text, Image, FlatList } from "react-native";
import { useContext } from "react";
import userContext from "../../context/userContext";
import BackgroundImage from "../../assets/background.png";
import AvatarImage from "../../assets/avatar.png";
import { useState } from "react";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";

export default function Profile({ navigation }) {

    const { state } = useContext(userContext)

    const [myFavoriteAdds, setMyFavoriteAdds] = useState([])
    const [myAdds, setMyAdds] = useState([])

    useEffect(() => {
        onValue(
            ref(db, 'adverts'), (snapshot) => {
                const data = snapshot.val()
                setMyFavoriteAdds(Object.entries(data).filter(add => checkIfExists(add[0])))
                setMyAdds(Object.values(data).filter(add => add.userId === state.user.uid))
            }
        )
    }, [])

    const checkIfExists = (id) => {
        if (state.user?.favorites) {
            if (state.user.favorites.includes(id)) {
                return true
            }
        }
        return false
    }

    const RenderItem = (item) => {
        const info = item[1]
        return (
            <Text>{info.header}</Text>
        )
    }

    const ListSeperator = () => {
        return (
            <View style={{
                width: 5
            }}/>
        )
    }

    // const countClicksOnMyAdds = () => {
    //     if (myAdds.filter(add => add?.clicked && add.clicked).length === 0) {
    //         return 0
    //     }
    //     return myAdds.filter(add => add?.clicked && add.clicked).map(add => add.clicked).reduce((x, y) => x + y)
    // }

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
                    justifyContent: "space-around"
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
                        PROFIILI
                    </Text>
                    <Avatar 
                        source={state.user.photoUrl ? { uri: state.user.photoUrl } : AvatarImage}
                        rounded
                        size={50}
                    />
                </View>

                <View
                    style={{
                        alignItems: "center",
                        flex: 1
                    }}
                >
                    {/* <View style={{
                        flex: 1,
                        marginTop: 20
                    }}>
                        <Text style={{ fontFamily: 'Dosis', fontSize: 20 }}>Suosikkini tällä hetkellä</Text>
                        {
                            state.user?.favorites || state.user.favorites.length > 0 ? (
                                <FlatList 
                                    horizontal={true}
                                    data={myFavoriteAdds}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({item}) => RenderItem(item)}
                                    ItemSeparatorComponent={ListSeperator}
                                />
                            )
                            :
                            <Text style={{ fontFamily: 'Dosis', fontSize: 15 }} >Ei vielä suosikkeja merkitty</Text>
                        }
                    </View> */}

                    {/* <View style={{
                        flex: 1,
                    }}>
                        <Text style={{ fontFamily: 'Dosis', fontSize: 20 }}>Suosituimmat ilmoitukseni</Text>
                    </View>

                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{ fontFamily: 'Dosis', fontSize: 20 }}>Ilmoituksiani katsottu yhteensä</Text>
                        <Text style={{ fontFamily: 'Dosis', fontSize: 15 }}><Text style={{ fontFamily: 'Dosis', fontSize: 15, fontWeight: 'bold' }}>{countClicksOnMyAdds()}</Text> kertaa</Text>
                    </View> */}
                        
                </View>
                
            </ImageBackground>
        </View>
    )
}