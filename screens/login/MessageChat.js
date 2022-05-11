import { Button } from "@rneui/themed";
import { onValue, ref, set } from "firebase/database";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { View, Text, FlatList, TextInput, Alert } from "react-native";
import userContext from "../../context/userContext";
import { db } from "../../firebase";

const todayIs = {
    day: new Date(new Date().getTime()).getDate().toLocaleString(),
    month: new Date(new Date().getTime()).getMonth() + 1,
    year: new Date(new Date().getTime()).getFullYear()
}

export default function MessageChat({ navigation, route }) {

    const { state } = useContext(userContext)
    const [otherUser, setOtherUser] = useState()
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
                // setQuestion(data.userId !== state.user.uid ? {...data, seen: true} : data)
                const settingUpQuestion = data.userId !== state.user.uid ? {...data, seen: true} : data
                setQuestion(settingUpQuestion.answers ? {...settingUpQuestion, answers: settingUpQuestion.answers.map(answer => answer.user !== state.user.uid ? {...answer, seen: true} : answer)} : settingUpQuestion)
                setMessages(data.answers ? [{date: data.date, message: data.message, seen: data.seen, user: data.userId}, ...data.answers] : [{date: data.date, message: data.message, seen: data.seen, user: data.userId}])
            }
        )
    }, [])
       
    const RenderItem = item => {
        return (
            <View>
                <Text style={{ fontSize: 8, marginLeft:5, marginBottom: -9 }}>
                    {
                        todayIs.day === new Date(item.date).getDate().toLocaleString() && todayIs.month === new Date(item.date).getMonth() + 1 && todayIs.year === new Date(item.date).getFullYear() ? `Tänään klo ${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}` : `Lähetetty: ${new Date(item.date).getDate().toLocaleString()}.${new Date(item.date).getMonth()+1}.${new Date(item.date).getFullYear()}`                        
                    }
                </Text>
                <View style={{
                    borderWidth: 1,
                    margin: 10,
                    borderColor: 'lightgrey'
                }}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                    
                    {
                        item.user === state.user.uid ? <Text>Sinä:</Text> : <Text>{question.add.userId === state.user.uid ? "Ilmoituksestasi kiinnostunut:" : "Ilmoittaja:"}</Text>
                    }
                        
                    </View>
                    <Text style={{ fontFamily: 'Dosis', margin: 10 }}>{item.message}</Text>
                </View>
            </View>
        )
    }

    const sendMessage = () => {
        message.message !== "" && set(
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