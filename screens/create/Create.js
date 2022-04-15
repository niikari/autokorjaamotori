import { Button, Icon, Input } from "@rneui/themed";
import { useContext } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, ScrollView, Dimensions } from "react-native";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";

const screen = Dimensions.get("screen")

export default function Create() {

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [advert, setAdvert] = useState({
        name: '',
        price: '',
        department: '',
        photos: [],
        text: ''
    })
    const { state } = useContext(userContext)

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
                        LUO ILMOITUS
                    </Text>
                </View>
                <ScrollView style={{
                    width: screen.width - screen.width * 0.2,
                    marginTop: 30
                }}>
                    <Input 
                        placeholder="Otsikko"
                        label="TUOTTEEN NIMI"
                        
                    />
                    <Input 
                        placeholder="€"
                        label="TUOTTEEN HINTA"
                    />
                    
                </ScrollView>
                <View style={{
                    width: '50%',
                    margin: 10
                }}>
                <Button 
                    title="Laita ilmoittaen"
                    type="outline"
                    titleStyle={{
                        fontFamily: 'Dosis',
                        color: "black",
                        fontSize: 20,
                        fontWeight: "bold"
                    }}
                    buttonStyle={{
                        backgroundColor: "white",
                        opacity: 0.7,
                        borderWidth: 0
                    }}
                    iconPosition="right"
                    icon={
                        <Icon name="add" />
                    }
                    disabled={buttonDisabled}
                />
                </View>
            </ImageBackground>
            
        </View>
    )
}