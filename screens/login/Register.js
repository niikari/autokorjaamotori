import { Icon, Input } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import LoginFacebookButton from "./LoginFacebookButton";
import LoginGoogleButton from "./LoginGoogleButton";
import RegisterEmailButton from "./RegisterEmailButton";

export default function Register() {

    const [secret, setSecret] = useState({
        hide: true,
        iconName: "visibility"
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [errorMsg, setErrorMsg] = useState({
        show: false,
        msg: '',
        type: ''
    })

    const handleMsg = (obj) => {
        setErrorMsg(obj)
        setTimeout(() => {
            setErrorMsg({
                show: false,
                msg: '',
                type: ''
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
                    label="SÄHKÖPOSTIOSOITE"
                    keyboardType="email-address"
                    leftIcon={
                        <Icon name="email" />
                    }
                    onChangeText={txt => setEmail(txt)}
                    value={email}
                    rightIcon={
                        <Icon name="backspace" onPress={() => setEmail('')} />
                    }
                    errorMessage={errorMsg.type === "email" ? errorMsg.msg : ""}
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
                    errorMessage={errorMsg.type === "password" ? errorMsg.msg : ""}
                />
                <Input 
                    secureTextEntry={secret.hide}
                    placeholder="******"
                    label="SALASANA UUDELLEEN"
                    
                    leftIcon={
                        <Icon name="lock" />
                    }
                    
                    rightIcon={
                        <Icon name={secret.iconName} onPress={handleIcon} />
                    }
                    onChangeText={txt => setPasswordAgain(txt)}
                    value={passwordAgain}
                    errorMessage={errorMsg.type === "password" ? errorMsg.msg : ""}
                />
                <RegisterEmailButton email={email} password={password} passwordAgain={passwordAgain} handleMsg={handleMsg} />
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