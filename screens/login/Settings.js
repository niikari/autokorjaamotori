import { Icon } from "@rneui/base";
import { Button, Input } from "@rneui/themed";
import { useContext } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import BackgroundImage from "../../assets/background.png";
import userContext from "../../context/userContext";
import { db } from "../../firebase";
import { set, ref, child } from "firebase/database";

export default function Settings({ navigation }) {

    const [editSelf, setEditSelf] = useState(false)
    const [editCompanies, setEditCompanies] = useState(false)
    const { state, updateCurrent } = useContext(userContext)

    const [userNameEdited, setUserNameEdited] = useState({
        username: '',
        iconColor: 'black',
        msg: "Vaihda käyttäjänimesi"
    })
    const [phoneNumberEdited, setPhoneNumberEdited] = useState({
        phoneNumber: '',
        iconColor: 'black',
        msg: "Vaihda tai lisää puhelinnumerosi"
    })

    const initUsernameEdited = () => {
        setUserNameEdited({
            username: '',
            iconColor: 'black',
            msg: "Vaihda käyttäjänimesi"
        })
    }

    const initPhoneNumberEdited = () => {
        setPhoneNumberEdited({
            phoneNumber: '',
            iconColor: 'black',
            msg: "Vaihda tai lisää puhelinnumerosi"
        })
    }

    const handleUsernameEdited = e => {
        if (e === '') {
            initUsernameEdited()
        } else {
            setUserNameEdited({...userNameEdited, username: e, msg: "Vahvista muutos vihreästä ikonista", iconColor: "green"})
        }
        
    }
    const handlePhoneNumberEdited = e => {
        if (e === '') {
            initPhoneNumberEdited()
        } else {
            setPhoneNumberEdited({...phoneNumberEdited, phoneNumber: e, msg: "Vahvista muutos vihreästä ikonista", iconColor: "green"})
        }
    }

    const changeUsername = () => {
        set(
            ref(db, `users/${state.user.uid}`), {
                ...state.user,
                username: userNameEdited
            }
        )
        .then(() => {
            setUserNameEdited({...userNameEdited, msg: "Käyttäjätunnus vaihdettu onnistuneesti"})
            updateCurrent({
                ...state.user, 
                username: userNameEdited.username
            })
            setTimeout(() => {
                initUsernameEdited()
            }, 3000);
        })
        .catch(err => setUserNameEdited({...userNameEdited, msg: "Jokin meni pieleen"}))
    }

    const changePhoneNumber = () => {

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
                    justifyContent: "space-around"
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
                        ASETUKSET
                    </Text>
                    <Icon name="settings" color="white" size={50} />
                </View>
                <View style={editSelf ? styles.editable : styles.notEditable}>
                    <View>
                        <Input
                            placeholder={state.user.username}
                            disabled={!editSelf}
                            rightIcon={
                                <Icon name="check-circle" color={userNameEdited.iconColor} onPress={changeUsername} />
                            }
                            errorMessage={editSelf ? userNameEdited.msg : ""}
                            onChangeText={txt => handleUsernameEdited(txt)}
                            value={userNameEdited.username}
                        />
                        <Input
                            placeholder={state.user.phoneNumber ? state.user.phoneNumber : "Lisää puhelinnumerosi"}
                            disabled={!editSelf}
                            rightIcon={
                                <Icon name="check-circle" color={phoneNumberEdited.iconColor} />
                            }
                            errorMessage={editSelf ? phoneNumberEdited.msg : ""}
                            value={phoneNumberEdited.phoneNumber}
                            onChangeText={txt => handlePhoneNumberEdited(txt)}
                            keyboardType="numeric"
                        />
                        <Pressable style={styles.pressable} onPress={() => setEditSelf(current => !current)}>
                            <Icon name="edit" />
                            <Text>Muokkaa tietoja</Text>
                        </Pressable>
                    </View>
                    {
                    state.user.places ? (
                        <View>
                            <Text>Korjaamoita</Text>
                        </View>
                    ):
                        <View style={{
                            margin: 10,
                            alignItems: "center"
                        }}>
                            <Text style={{ fontFamily: 'Dosis', fontSize: 20, marginBottom: 30 }}>Ei liitettyjä toimipaikkoja / yritystä</Text>
                            <Button 
                                title="Lisää"
                                type="outline"
                                titleStyle={{ fontFamily: 'Dosis', color: "black", fontWeight: "bold" }}
                                buttonStyle={{ borderColor: "black" }}
                                iconPosition="right"
                                icon={
                                    <Icon name="add" />
                                }
                                onPress={() => navigation.navigate("addplace")}
                            />
                        </View>
                    }
                    
                    
                </View>
                
                
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    pressable: {
        // marginTop: 'auto',
        marginLeft: 'auto',
        marginBottom: 10,
        marginRight: 'auto',
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },
    notEditable: {
        flex: 2,
        margin: 10,
        backgroundColor: "white",
        opacity: 0.8,
        borderRadius: 10
    },
    editable: {
        flex: 2,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10
    }
})