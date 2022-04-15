import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from '@rneui/themed';
import { useContext } from 'react';
import userContext from '../../context/userContext';
import Login from './Login';
import ProfileNavigator from './ProfileNavigator';
import Register from './Register';
import { ImageBackground } from 'react-native';
import Image from "../../assets/background.png"

const Tab = createMaterialTopTabNavigator()

export default function LoginNavigator() {

    const { state } = useContext(userContext)

    const screenOptions = (props) => {
        
    }
    
    if (state.user) {
        return <ProfileNavigator />
    } else {
        return (
            <ImageBackground
                source={Image}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <Tab.Navigator screenOptions={{
                    tabBarActiveTintColor: "black",
                    tabBarLabelStyle: { fontFamily: 'Dosis', fontSize: 20 },
                    tabBarStyle: { flex: 0.4, justifyContent: "center", opacity: 0.7 },
                }} >
                    <Tab.Screen name="login" component={Login} options={{ title: "Kirjaudu" }} />
                    <Tab.Screen name="register" component={Register} options={{ title: "Rekisteröidy" }} />
                </Tab.Navigator>
            </ImageBackground>
        )
    }

    
}