import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useContext } from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import userContext from "../../context/userContext";
import AvatarImage from "../../assets/avatar.png"
import { Button } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { app } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app)

export default function ProfileNavigatorContent(props) {

    const { state, logout } = useContext(userContext)

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
                        <ImageBackground 
                            source={AvatarImage}
                            resizeMode="cover"
                            style={{
                                flex: 1,
                                width: 50,
                                height: 50
                            }}
                        />

                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Dosis', fontSize: 20 }}>{state.user.username}</Text>
                    </View>
                </View>
                <View style={{
                    marginLeft: 30,
                    flexDirection: "row"
                }}>
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15, marginRight: 30 }}><Text style={{ fontFamily: 'Dosis', fontSize: 15, fontWeight: 'bold' }}>20</Text> Ilmoitusta</Text>
                    <Text style={{ fontFamily: 'Dosis', fontSize: 15 }}><Text style={{ fontFamily: 'Dosis', fontSize: 15, fontWeight: 'bold' }}>1</Text> Yritys</Text>
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
                        <Pressable style={styles.content}>
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
                    <Icon name="logout" style={{ marginRight: 20 }} />
                } 
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