import { Button } from "@rneui/themed";
import { useContext } from "react";
import userContext from "../../context/userContext";
import { app, db } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from "firebase/database";

const auth = getAuth(app)

export default function LoginEmailButton({ email, password, handleMsg }) {

    const { login } = useContext(userContext)

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email.replace(" ", ""), password)
        .then(user => {
            if (user) {
                login(user.user)
            } else {
                handleMsg({
                    show: true,
                    msg: "Sähköpostiosoite tai salasana virheellinen"
                })
            }
        })
        .catch(err => {
            if (err.code === "auth/user-not-found") {
                handleMsg({
                    show: true,
                    msg: "Sähköpostiosoite tai salasana virheellinen"
                })
            } else if (err.code === "auth/invalid-email") {
                handleMsg({
                    show: true,
                    msg: "Virheellinen sähköpostiosoite"
                })
            } else {
                handleMsg({
                    show: true,
                    msg: "Sähköpostiosoite tai salasana virheellinen"
                })
            }
        })
    }

    return (
        <Button 
            title="Kirjaudu"
            titleStyle={{
                fontFamily: 'Dosis'
            }}
            buttonStyle={{
                backgroundColor: "black",
                borderRadius: 100,
                marginBottom: 30
            }}
            onPress={handleLogin}
        />
    )

}