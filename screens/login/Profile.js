import { Button, Icon } from "@rneui/themed";
import { View, ImageBackground, Text, Image } from "react-native";
import { app } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import userContext from "../../context/userContext";
import BackgroundImage from "../../assets/background.png";
import AvatarImage from "../../assets/avatar.png";

const auth = getAuth(app)

export default function Profile({ navigation }) {

    const { state } = useContext(userContext)

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
                    <Icon name="person" color="white" size={50} />
                </View>

                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <ImageBackground 
                        source={AvatarImage}
                        resizeMode="cover"
                        style={{
                            height: 200,
                            width: 200,
                            opacity: 0.9,
                            margin: 30
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: 'Dosis',
                            textAlign: "center",
                            color: "black",
                            fontSize: 20,
                            marginTop: -20
                        }}
                    >
                        {state.user.username}
                    </Text>
                    
                </View>
                
            </ImageBackground>
        </View>
    )
}