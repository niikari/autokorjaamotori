import { Avatar, Button, Icon } from "@rneui/themed";
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
                    <Avatar 
                        source={state.user.photoUrl ? { uri: state.user.photoUrl } : AvatarImage}
                        rounded
                        size={50}
                    />
                </View>

                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    
                    
                </View>
                
            </ImageBackground>
        </View>
    )
}