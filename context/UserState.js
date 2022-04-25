import { LOGIN, LOGOUT, WELCOME, REGISTER, UPDATE } from "./userActions";
import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import { db } from "../firebase";
import { ref, set, onValue } from "firebase/database";

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
            ref(db, `users/${user.uid}`), {
                email: user.email,
                uid: user.uid
            }
        )
        // MUUTETAAN VIELÄ NIIN ETTÄ KUUNTELEE MUUTOKSIA TIETOKANNASSA
        .finally(() => login(user))
        .catch(err => console.log(err))
    }

    const logout = () => {
        dispatch({
            type: LOGOUT,
        })
    }

    const login = (user) => {
        onValue(
            ref(db, `users/${user.uid}`), (snapshot) => {
                const data = snapshot.val()
                dispatch({
                    type: LOGIN,
                    payload: data
                })
            }
        )
        
    }
   

    return (
        <UserContext.Provider value={{
            state, setWelcomeSeen, register, logout, login,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}