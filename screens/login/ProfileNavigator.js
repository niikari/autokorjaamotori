import { createDrawerNavigator } from '@react-navigation/drawer';
import MessagesNavigator from './MessagesNavigator';
import MyAdds from './MyAdds';
import Profile from "./Profile";
import ProfileNavigatorContent from './ProfileNavigatorContent';
import SettingsNavigator from './SettingsNavigator';

const Drawer = createDrawerNavigator ()

export default function ProfileNavigator() {

    return (
        <Drawer.Navigator drawerContent={props => <ProfileNavigatorContent {...props} />} >
            <Drawer.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <Drawer.Screen name="settingsnavigator" component={SettingsNavigator} options={{ headerShown: false }} />
            <Drawer.Screen name="messagesnavigator" component={MessagesNavigator} options={{ headerShown: false }} />
            <Drawer.Screen name="myadds" component={MyAdds} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}