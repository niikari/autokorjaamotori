import { createStackNavigator } from "@react-navigation/stack";
import Messages from "./Messages";

const Stack = createStackNavigator()

export default function MessagesNavigator() {


    return (
        <Stack.Navigator>
            <Stack.Screen name="messages" component={Messages} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}