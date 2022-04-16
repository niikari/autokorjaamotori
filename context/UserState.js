import { LOGIN, LOGOUT, WELCOME, REGISTER, UPDATE } from "./userActions";
import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

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
        console.log("Objekti täällä: " + user)
        set(
            ref(db, `users/${user.uid}`), {
                email: user.email,
                uid: user.uid
            }
        )
        .then(() => {
            dispatch({
                type: REGISTER,
                payload: {
                    uid: user.uid,
                    email: user.email
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
        dispatch({
            type: LOGIN,
            payload: user
        })
    }
   

    return (
        <UserContext.Provider value={{
            state, setWelcomeSeen, register, logout, login,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}