import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useContext, useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import userContext from "../../context/userContext";
import AvatarImage from "../../assets/avatar.png"
import { Avatar, Button } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { app } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const auth = getAuth(app)

export default function ProfileNavigatorContent(props) {

    const { state, logout } = useContext(userContext)

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        onValue(
            ref(db, 'questions'), (snapshot) => {
                const data = Object.entries(snapshot.val())
                setQuestions(data.filter(ques => ques[1].userId === state.user.uid || ques[1].add.userId === state.user.uid ))
            }
        )
    }, [])

    const handleLogout = () => {
        signOut(auth)
        logout()
    }

    return (
        <View style={{
            flex: 1
        }}>
            <DrawerContentScrollView {...props}>
                <View style={{
                    flexDirection: "row",
                    alignItems:"center"
                }}>
                    <View style={{
                        borderRadius: 1000,
                        margin: 15
                    }}>
                        <Avatar 
                            source={state.user.photoUrl ? { uri: state.user.photoUrl } : AvatarImage}
                            rounded
                        />
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Dosis', fontSize: 20 }}>{state.user.email}</Text>
                    </View>
                </View>
                <View style={{
                    marginLeft: 30,
                    flexDirection: "row"
                }}>
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15, marginRight: 30 }}><Text style={{ fontFamily: 'Dosis', fontSize: 15, fontWeight: 'bold' }}>20</Text> Ilmoitusta</Text>
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15 }}><Text style={{ fontFamily: 'Dosis', fontSize: 15, fontWeight: 'bold' }}>{state.user.places ? state.user.places.length : 0}</Text> {state.user.places ? (state.user.places.length === 0 || state.user.places.length > 0 ? "Yritystä" : "Yritys") : "Yritystä" }</Text>
                </View>

                <View style={{
                    marginLeft: 30,
                    marginTop: 20,
                    borderTopColor: "lightgrey",
                    borderTopWidth: 1
                }}>
                    <View style={{
                        marginTop: 20
                    }}>
                        <Pressable style={styles.content} onPress={() => props.navigation.navigate("profile")}>
                            <Icon name="face" size={30} />
                            <Text style={styles.contentTitle}>Profiili</Text>
                        </Pressable>
                        <Pressable style={styles.content}>
                            <Icon name="assignment" size={30} />
                            <Text style={styles.contentTitle}>Ilmoitukseni</Text>
                        </Pressable>
                        <Pressable style={styles.content} onPress={() => props.navigation.navigate("messagesnavigator")} >
                            <Icon name="question-answer" size={30} />
                            <Text style={styles.contentTitle}>Viestit</Text>
                        </Pressable>
                        <Pressable style={styles.content} onPress={() => props.navigation.navigate("settingsnavigator")}>
                            <Icon name="settings" size={30} />
                            <Text style={styles.contentTitle}>Asetukset</Text>
                        </Pressable>
                    </View>
                </View>

            </DrawerContentScrollView>
            <Button 
                title="Kirjaudu ulos"
                type="clear"
                iconPosition="left"
                icon={
                    <Icon name="logout" style={{ marginRight: 10 }} />
                } 
                buttonStyle={{
                    marginRight: 'auto'
                }}
                titleStyle={{
                    fontFamily: 'Dosis',
                    color: "black",
                }}
                onPress={handleLogout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        // borderBottomWidth: 1,
        borderColor: "grey",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",   
    },
    contentTitle: {
        fontFamily: 'Dosis',
        fontSize: 30,
        marginLeft: 20
    },
    
})