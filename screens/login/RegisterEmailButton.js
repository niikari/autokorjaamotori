import { Button } from "@rneui/themed";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useContext } from "react";
import userContext from "../../context/userContext";

const auth = getAuth(app)

export default function RegisterEmailButton({ email, password, passwordAgain, handleMsg }) {

    const { register } = useContext(userContext)

    const handleRegister = () => {
        if (password === passwordAgain && password.length > 5) {
            createUserWithEmailAndPassword(auth, email.replace(" ", ""), password)
            .then(user => {
                register(user)
            })
            .catch(err => {
                if (err.code === "auth/email-already-in-use") {
                    handleMsg({
                        show: true,
                        msg: "Sähköpostiosoite on jo käytössä",
                        type: "email"
                    })
                } else if (err.code === "auth/invalid-email") {
                    handleMsg({
                        show: true,
                        msg: "Sähköpostiosoite ei kelpaa",
                        type: "email"
                    })
                }
            })
        } else {
            handleMsg({
                show: true,
                msg: "Salasanasi eivät kelpaa (min 6 merkkiä, oltava samat)",
                type: "password"
            })
        } 
    }

    return (
        <Button 
            title="Rekisteröidy"
            titleStyle={{
                fontFamily: 'Dosis'
            }}
            buttonStyle={{
                backgroundColor: "black",
                borderRadius: 100,
                marginBottom: 30
            }}
            onPress={handleRegister}
        />
    )

}