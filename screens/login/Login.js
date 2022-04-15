import { Icon, Input } from "@rneui/themed";
import { useState } from "react";
import { View, Text } from "react-native";
import LoginEmailButton from "./LoginEmailButton";
import LoginFacebookButton from "./LoginFacebookButton";
import LoginGoogleButton from "./LoginGoogleButton";

export default function Login() {

    const [secret, setSecret] = useState({
        hide: true,
        iconName: "visibility"
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState({
        show: false,
        msg: ''
    })

    const handleMsg = (obj) => {
        setErrorMsg(obj)
        setTimeout(() => {
            setErrorMsg({
                show: false,
                msg: '',
            })
        }, 5000);
    } 

    const handleIcon = () => {
        if (secret.hide) {
            setSecret({hide: false, iconName: "visibility-off"})
        } else {
            setSecret({hide: true, iconName: "visibility"})
        }
    }

    return (
        <View style={{
            flex: 1,
            alignItems: "center"
        }}>
            <View style={{
                width: '85%',
                margin: 10
            }}>
                <Input 
                    placeholder="käyttäjä@sähköposti.fi"
                    keyboardType="email-address"
                    label="SÄHKÖPOSTIOSOITE"
                    leftIcon={
                        <Icon name="email" />
                    }
                    onChangeText={txt => setEmail(txt)}
                    value={email}
                    rightIcon={
                        <Icon name="backspace" onPress={() => setEmail('')} />
                    }
                    errorMessage={errorMsg.show ? errorMsg.msg : ""}
                />
                <Input 
                    secureTextEntry={secret.hide}
                    placeholder="******"
                    label="SALASANA"
                    
                    leftIcon={
                        <Icon name="lock" />
                    }
                    
                    rightIcon={
                        <Icon name={secret.iconName} onPress={handleIcon} />
                    }
                    onChangeText={txt => setPassword(txt)}
                    value={password}
                    errorMessage={errorMsg.show ? errorMsg.msg : ""}
                />
                <LoginEmailButton email={email} password={password} handleMsg={handleMsg} />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    <LoginGoogleButton />
                    <LoginFacebookButton />
                </View>
                
            </View>
        </View>
    )
}