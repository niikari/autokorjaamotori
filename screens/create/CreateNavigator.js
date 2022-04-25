import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import userContext from "../../context/userContext";
import Create from "./Create";
import Kamera from "./Kamera";
import NotLoggedCreate from "./NotLoggedCreate";

const Stack = createStackNavigator()

export default function CreateNavigator() {

    const { state } = useContext(userContext)

    if (state.user) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="create" component={Create} options={{ headerShown: false }} />
                <Stack.Screen name="camera" component={Kamera} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    } else {
        return <NotLoggedCreate />
    }    
    
}