import { useEffect, useContext } from "react";
import { Text, ImageBackground, Dimensions, View } from "react-native";
import WelcomeImage from "./assets/background.png";
import userContext from "./context/userContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app)
const screen = Dimensions.get("screen")

export default function WelcomePage() {

    const { state, login } = useContext(userContext)

    useEffect(() => {
        auth.onAuthStateChanged((item) => {
            if (item) {
                const user = {
                    user: {
                        uid: item.uid
                    }
                }
                login(user)
            }
        })
    }, [])

    return (
        <ImageBackground 
            style={{ 
                flex: 1, 
                alignItems: "center", 
                justifyContent: "center", 
                backgroundColor: "black"
            }}
            source={WelcomeImage}
            resizeMode="cover"
        >
            <Text style={{ 
                fontFamily: 'Dosis', 
                color: "white",
                fontSize: 30,
                textAlign: "center"
            }}>
                Tervetuloa ammattilaisten kauppapaikkaan
            </Text>
            <View 
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "white",
                    width: "60%",
                    marginTop: 10
                }}
            />
            <Text style={{ 
                fontFamily: 'Dosis', 
                color: "white",
                fontSize: 20,
                textAlign: "center",
                marginTop: 40,
                marginBottom: 70
            }}>
                Täällä autokorjaamoalan ammattilaiset voivat myydä, ostaa ja vuokrata varaosia, laitteita, työkaluja, tekijöitä...
            </Text>
            {
                state.user ? (
                    <Text style={{ 
                        fontFamily: 'Dosis', 
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 40,
                        marginBottom: 70
                    }}>
                        Tervetuloa takaisin {state.user.username}
                    </Text>
                ):
                (
                    <Text style={{ 
                        fontFamily: 'Dosis', 
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 40,
                        marginBottom: 70
                    }}>
                        
                    </Text>
                )
            }
        </ImageBackground>
    )
}