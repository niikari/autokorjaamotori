import { View, Text, ImageBackground, Dimensions, Image } from "react-native";
import BackgroundImage from "../../assets/background.png";
import ChecklistImage from "../../assets/checklist.png";

const screen = Dimensions.get("screen")

export default function NotLoggedCreate() {

    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground
                source={BackgroundImage}
                resizeMode="cover"
                style={{
                    flex: 1
                }}
            >
                <View style={{
                flex: 1,
                marginTop: 60,
                marginLeft: 10
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontFamily: 'Dosis',
                        fontSize: 28,
                    }} >
                        Kirjaudu tai rekisteröidy käyttäjäksi voidaksesi luoda ilmoituksia
                    </Text>
                </View>
                <View style={{
                flex: 2
                }}>
                    <Image
                        source={ChecklistImage}
                        resizeMode="cover"
                        style={{
                            flex: 1,
                            width: screen.width,
                            marginBottom: 30
                        }}

                    />
                </View>
            </ImageBackground>
            
        </View>
    )
}