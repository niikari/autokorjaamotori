import { createStackNavigator } from "@react-navigation/stack";
import MessageChat from "./MessageChat";
import Messages from "./Messages";

const Stack = createStackNavigator()

export default function MessagesNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="messages" component={Messages} options={{ headerShown: false }} />
            <Stack.Screen name="messagechat" component={MessageChat} options={{ title: "Viestiketju" }} />
        </Stack.Navigator>
    )
}