import { Button, Dialog, Icon } from "@rneui/themed";
import { db } from "../../firebase";
import { ref, push } from "firebase/database";
import { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";

export default function SendMessageButton({ addId, userId, info }) {

    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState({
        seen: false,
        date: '',
        message: '',
        userId: userId,
        addId: addId,
        add: info
    })

    const sendMessage = () => {
        push(
            ref(db, `questions`), message
        )
        .then(() => initialize())
        .catch(err => Alert.alert("Hups!", "Jokin meni pieleen..."))
    }

    const initialize = () => {
        setMessage({
            seen: false,
            date: '',
            message: ''
        })
        setVisible(!visible)
        Alert.alert("Viestisi lähetetty ilmoittajalle")
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
                    value={message.message}
                    onChangeText={txt => setMessage({...message, message: txt, date: new Date().getTime()})}            
                />
                <Dialog.Actions>
                    <Button title="Lähetä" type="clear" onPress={sendMessage} />
                    <Button title="Peruuta" type="clear" titleStyle={{ color: "red" }} onPress={() => setVisible(!visible)} />
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}