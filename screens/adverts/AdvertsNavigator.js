import { createStackNavigator } from "@react-navigation/stack";
import Advert from "./Advert";
import AllAdverts from "./AllAdverts";
import OnMap from "./OnMap";

const Stack = createStackNavigator()

export default function AdvertsNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="alladverts" component={AllAdverts} options={{ headerShown: false }} />
            <Stack.Screen name="onmap" component={OnMap} options={{ title: "Sijainti" }} />
            <Stack.Screen name="advert" component={Advert} options={{ title: "Ilmoitus", headerShown: false }} />
        </Stack.Navigator>
    )
}