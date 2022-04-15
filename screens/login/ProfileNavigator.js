import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from "./Profile";
import ProfileNavigatorContent from './ProfileNavigatorContent';
import Settings from './Settings';
import SettingsNavigator from './SettingsNavigator';

const Drawer = createDrawerNavigator ()

export default function ProfileNavigator() {

    return (
        <Drawer.Navigator drawerContent={props => <ProfileNavigatorContent {...props} />} >
            <Drawer.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <Drawer.Screen name="settingsnavigator" component={SettingsNavigator} options={{ headerShown: false }} />
            
        </Drawer.Navigator>
    )
}