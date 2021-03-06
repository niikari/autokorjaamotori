import { Icon } from "@rneui/base";
import { Button, Input } from "@rneui/themed";
import { useContext } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import { db } from "../../firebase";
import { set, ref, child } from "firebase/database";
import AddPlaceToProfile from "./AddPlaceToProfile";

export default function Settings({ navigation }) {
    
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
                        ASETUKSET
                    </Text>
                    <Icon name="settings" color="white" size={50} />
                </View>
                <View style={{

                }}>
                    <Text style={{ fontFamily: 'Dosis', textAlign: "center", fontSize: 25, color: "white" }}>Omat toimipaikkani</Text>
                    <AddPlaceToProfile />
                </View>                
                
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    pressable: {
        // marginTop: 'auto',
        marginLeft: 'auto',
        marginBottom: 10,
        marginRight: 'auto',
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },
    notEditable: {
        flex: 2,
        margin: 10,
        backgroundColor: "white",
        opacity: 0.8,
        borderRadius: 10
    },
    editable: {
        flex: 2,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10
    }
})