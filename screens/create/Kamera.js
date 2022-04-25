import { useState } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import { useRef } from "react";
import { useEffect } from "react";
import { async } from "@firebase/util";
import { Button, Icon } from "@rneui/themed";

export default function Kamera({ navigation }) {

    const camera = useRef(null)
    const [hasCameraPermission, setPermission] = useState(null)

    useEffect(() => {
        if (!hasCameraPermission) {
            askPermission()
        }
    }, [])

    const askPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setPermission( status === 'granted' )
    }

    const snap = async () => {
        const photo = await camera.current.takePictureAsync({base64: true})
        navigation.navigate("create", {
            photo: photo
        })
    }

    return (
        <View style={{
            flex: 1
        }}>
            {
                hasCameraPermission ? (
                    <View style={{
                        flex:1
                    }}>
                        <View style={{
                        flex:1
                        }}>
                            <Camera style={{ flex:1, alignItems: "center", justifyContent: "flex-end" }} ref={camera} >
                                <Icon name="camera" color="white" size={80} iconStyle={{ margin: 60 }} onPress={snap} />
                            </Camera>
                            
                        </View>
                    </View>
                )
                :
                (
                    <View><Text>Ei lupaa</Text></View>
                )
            }
        </View>
    )
}