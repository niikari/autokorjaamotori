import { Button } from "@rneui/themed";
import { onValue, ref, set } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { View, Text, FlatList, TextInput, Alert } from "react-native";
import userContext from "../../context/userContext";
import { db } from "../../firebase";

export default function MessageChat({ navigation, route }) {

    const { state } = useContext(userContext)
    const [message, setMessage] = useState({
        date: new Date().getTime(),
        message: '',
        seen: false,
        user: state.user.uid
    })
    const [question, setQuestion] = useState()
    const [messages, setMessages] = useState()

    useEffect(() => {
        onValue(
            ref(db, `questions/${route.params.questionId}`), (snapshot) => {
                const data = snapshot.val()
                setQuestion(data)
                setMessages(data.answers ? [{date: data.date, message: data.message, seen: data.seen, user: data.userId}, ...data.answers] : [{date: data.date, message: data.message, seen: data.seen, user: data.userId}])
            }
        )
    }, [])

    const RenderItem = item => {
        return (
            <View style={{
                borderWidth: 1,
                margin: 10,
                borderColor: 'lightgrey'
            }}>
                {
                    item.user === state.user.uid ? <Text>Sinä:</Text> : <Text>{question.add.userId === state.user.uid ? "Ilmoituksestasi kiinnostunut:" : "Ilmoittaja:"}</Text>
                }
                <Text style={{ fontFamily: 'Dosis', margin: 10 }}>{item.message}</Text>
            </View>
        )
    }

    const sendMessage = () => {
        set(
            ref(db, `questions/${route.params.questionId}`), {
                ...question,
                answers: question.answers ? [...question.answers, message] : [message]
            }
        )
        .then(() => {
            initialize()
        })
        .catch(err => Alert.alert("Hups!", "Jokin meni pieleen..."))
    }

    const initialize = () => {
        setMessage({
            date: new Date().getTime(),
            message: '',
            seen: false,
            user: state.user.uid
        })
    }

    while (!question) {
        return null
    }

    return (
        <View style={{
            flex: 1
        }}>
            <Text style={{ fontFamily: 'Dosis', fontSize: 20, margin: 10 }}>Ilmoitus: <Text style={{ fontWeight: 'bold' }}>{question.add.header}</Text></Text>
            <FlatList
                style={{
                    flex: 5
                }} 
                data={messages}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => RenderItem(item)}                           
            />
            <View style={{
                
            }}>
                <TextInput 
                    placeholder="Kirjoita viestisi..."
                    value={message.message}
                    onChangeText={txt => setMessage({...message, message: txt})}
                    style={{

                    }}
                />
                <Button title="Lähetä" titleStyle={{ fontFamily: 'Dosis' }} onPress={sendMessage} />
            </View>
        </View>
    )
}