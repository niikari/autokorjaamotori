import { Icon } from "@rneui/themed";
import { onValue, ref } from "firebase/database";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, FlatList } from "react-native";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import { db } from "../../firebase";

export default function Messages({ navigation }) {

    const { state } = useContext(userContext)
    const [adds, setAdds] = useState([])
    // VIESTIT OVAT SELLAISIA ILMOITUKSIA, JOISSA ON VIESTEJÄ JA OLEN ILMOITUKSEN JÄTTÄJÄ TAI MUKANA MESSAGES LISTASSA

    useEffect(() => {
        onValue(
            ref(db, 'adverts'), (snapshot) => {
                const data = snapshot.val()
                const allAdds = Object.entries(data)
                setAdds(allAdds.filter(add => add[1]?.messages).filter(add => add[1].userId === state.user.uid || Object.values(add[1].messages).includes(state.user.uid)  ))
            }
        )
    }, [])

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
                        VIESTIT
                    </Text>
                    <Icon name="message" color="white" size={50} />
                </View>
                <View style={{
                    flex: 1
                }}>
                    <FlatList 

                    />
                </View>                
                
            </ImageBackground>
        </View>
    )
}