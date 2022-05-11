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
    const [unAnsweredQuestions, setUnAnsweredQuestions] = useState(false)
    const [userAdds, setUserAdds] = useState([])

    useEffect(() => {
        onValue(
            ref(db, 'adverts'), (snapshot) => {
                const data = snapshot.val()
                setUserAdds(Object.values(data).filter(add => add.userId === state.user.uid))
            }
        )
    }, [])

    useEffect(() => {
        onValue(
            ref(db, 'questions'), (snapshot) => {
                // const data = Object.entries(snapshot.val()).map(obj => obj[1]).filter(quest => quest?.answers && quest).map(quest => quest.answers).map(answer => answer.filter(obj => obj.seen === false && obj.user !== state.user.uid ))
                // const data = Object.entries(snapshot.val()).map(obj => ({
                //     answers: obj[1].answers ? obj[1].answers : [],
                //     originalQuestion: obj[1].message,
                //     originalQuestionSeen: obj[1].seen,
                //     originalQuestionFromUser: obj[1].userId,
                //     questionId: obj[0],
                //     add: obj[1].add
                // }))
                // // KÄYTTÄJÄ ON MUKANA KYSYMYKSESSÄ JOKO KYSYTTÄVÄN ILMOITUKSEN LUOJANA, KYSYJÄNÄ ALUN PERIN TAI VASTAAJANA KETJUSSA
                // .filter(ques => ques.add.userId === state.user.uid || ques.originalQuestionFromUser === state.user.uid || (ques.answers.filter(answer => answer.user === state.user.uid).length > 0))
                // .map(obj => {
                //     if (obj.originalQuestionSeen === false && originalQuestionFromUser !== state.user.uid) {
                //         setUnAnsweredQuestions(true)
                //     }
                //     if (obj.answers.filter(answer => answer.seen === false && answer.user !== state.user.uid)) {
                //         setUnAnsweredQuestions(true)
                //     }
                // })
                // console.log(data)
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
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15, marginRight: 30 }}><Text style={{ fontFamily: 'Dosis', fontSize: 15, fontWeight: 'bold' }}>{userAdds.length}</Text> {userAdds.length === 1 ? "Ilmoitus" : "Ilmoitusta"}</Text>
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
                        <Pressable style={styles.content} onPress={() => props.navigation.navigate("myadds")}>
                            <Icon name="assignment" size={30} />
                            <Text style={styles.contentTitle}>Ilmoitukseni</Text>
                        </Pressable>
                        <Pressable style={styles.content} onPress={() => props.navigation.navigate("messagesnavigator")} >
                            {
                                unAnsweredQuestions ? (
                                    <Icon name="mark-as-unread" size={30} color="red" />
                                )
                                :
                                (
                                    <Icon name="question-answer" size={30} />
                                )
                            }
                            
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