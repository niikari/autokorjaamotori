import { LOGIN, LOGOUT, WELCOME, REGISTER, UPDATE } from "./userActions";
import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import { db } from "../firebase";
import { ref, set, get, child } from "firebase/database";

export default function UserState(props) {

    const initialState = {
        user: null,
        welcome: true
    }

    const [state, dispatch] = useReducer(userReducer, initialState)

    const setWelcomeSeen = () => {
        dispatch({
            type: WELCOME
        })
    }

    const register = (user) => {
        set(
            ref(db, `users/${user.user.uid}`), {
                email: user.user.email,
                username: user.user.email.split("@")[0]
            }
        )
        .then(() => {
            dispatch({
                type: REGISTER,
                payload: {
                    uid: user.user.uid,
                    email: user.user.email,
                    username: user.user.email.split("@")[0]
                }  
            })
        })
        .catch(err => console.log(err))
    }

    const logout = () => {
        dispatch({
            type: LOGOUT,
        })
    }

    const login = (user) => {
        const dbRef = ref(db)
        get(child(dbRef, `users/${user.user.uid}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                dispatch({
                    type: LOGIN,
                    payload: {...snapshot.val(), uid: user.user.uid}
                })
            } else {
                console.log("Käyttäjää ei löytynyt")
            }
        })
        .catch(err => console.log(err))
    }

    const updateCurrent = (user) => {
        console.log(user)
        dispatch({
            type: UPDATE,
            payload: user
        })
    }

    return (
        <UserContext.Provider value={{
            state, setWelcomeSeen, register, logout, login, updateCurrent
        }}>
            {props.children}
        </UserContext.Provider>
    )
}