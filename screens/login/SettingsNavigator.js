import { createStackNavigator } from "@react-navigation/stack";
import AddPlaceToProfile from "./AddPlaceToProfile";
import Settings from "./Settings";

const Stack = createStackNavigator()

export default function SettingsNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="addplace" component={AddPlaceToProfile} />
        </Stack.Navigator>
    )
}