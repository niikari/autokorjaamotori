import { Button, Dialog, Icon } from "@rneui/themed";
import { db } from "../../firebase";
import { set, ref, onValue } from "firebase/database";
import { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { useEffect } from "react";

export default function SendMessageButton({ addId, info, userId }) {

    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        onValue(
            ref(db, `adverts/${addId}`), (snapshot) => {
                const data = snapshot.val()
                data.messages && setMessages(data.messages)
            }
        )
    }, [])

    const sendMessage = async () => {
        set(
            ref(db, `adverts/${addId}`), {
                ...info,
                messages: [...messages, {
                    message: message,
                    date: new Date().getTime(),
                    sender: userId,
                    seen: false
                }]
            }
        )
        .then(() => {
            setMessage('')
            setVisible(!visible)
            Alert.alert("Viesti lähetetty ilmoittajalle")
        })
        .catch(err => console.error(err))
    }

    return (
        <View>
            <Button 
                title="Lähetä viesti"
                type="clear"
                iconPosition="right"
                icon={
                    <Icon name="message" color="lightblue" />
                }
                onPress={() => setVisible(!visible)}
            />
            <Dialog
                isVisible={visible}
                onBackdropPress={() => setVisible(!visible)}
            >               
                <Text style={{ fontFamily: 'Dosis', textAlign: "center", fontWeight: "bold" }}>Viesti ilmoituksen jättäjälle</Text>
                <TextInput 
                    placeholder="Viestisi..."
                    multiline={true}
                    numberOfLines={8}
                    style={{
                        marginTop: 20
                    }}
                    textAlignVertical="top"
                    value={message}
                    onChangeText={txt => setMessage(txt)}            
                />
                <Dialog.Actions>
                    <Button title="Lähetä" type="clear" onPress={sendMessage} />
                    <Button title="Peruuta" type="clear" titleStyle={{ color: "red" }} onPress={() => setVisible(!visible)} />
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}