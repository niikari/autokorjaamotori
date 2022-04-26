import { ListItem } from "@rneui/base";
import { Avatar, Icon } from "@rneui/themed";
import { onValue, ref } from "firebase/database";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, FlatList } from "react-native";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import { db } from "../../firebase";
import AvatarImage from "../../assets/no_photo.png"

export default function Messages({ navigation }) {

    const { state } = useContext(userContext)
    const [questions, setQuestions] = useState([]) // KYSYMYKSIÄ, JOISSA KÄYTTÄJÄ JOKO KYSYJÄNÄ TAI ILMOITUKESSA ILMOITTAJA JOHON KYSYMYS LIITTYY

    useEffect(() => {
        onValue(
            ref(db, 'questions'), (snapshot) => {
                const data = Object.entries(snapshot.val())
                setQuestions(data.filter(ques => ques[1].userId === state.user.uid || ques[1].add.userId === state.user.uid ))
            }
        )
    }, [])

    const RenderItem = item => {
        const id = item[0]
        const ques = item[1]
        return (
            <ListItem>
                <Avatar 
                    rounded
                    source={ques.add.photos ? {uri: ques.add.photos[0]} : AvatarImage}
                    size={50}
                />
                <ListItem.Content>
                    <ListItem.Title>{ques.add.header}</ListItem.Title>
                    <ListItem.Subtitle>Viimeisin:</ListItem.Subtitle>
                    <ListItem.Subtitle>   
                        {
                            ques.answers ? ques.answers[ques.answers.length - 1].message : ques.message
                        }
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron size={40} onPress={() => navigation.navigate("messagechat", {questionId: id})} />
            </ListItem>
        )
    }

    const ListItemSeperator= () => {
        return (
            <View style={{
                height: 5
            }}/>
        )
    }

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
                        data={questions}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => RenderItem(item)}
                        ItemSeparatorComponent={ListItemSeperator}
                    />
                </View>                
                
            </ImageBackground>
        </View>
    )
}