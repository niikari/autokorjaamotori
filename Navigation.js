import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginNavigator from "./screens/login/LoginNavigator";
import { useContext } from "react";
import userContext from "./context/userContext";
import WelcomePage from "./WelcomePage";
import { useEffect } from "react";
import { Icon } from "@rneui/themed";
import CreateNavigator from "./screens/create/CreateNavigator";
import { useState } from "react";

const Tab = createBottomTabNavigator()

export default function Navigation() {

    const { state, setWelcomeSeen } = useContext(userContext)

    useEffect(() => {
        setTimeout(() => {
            setWelcomeSeen()
        }, 7000);
    }, [])

    while (state.welcome) {
        return <WelcomePage />
    }

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          focused ? size=60 : size=40
          if (route.name === 'adverts') {
            iconName = 'search'
          } else if (route.name === 'loginavigator') {
            iconName = state.user ? "person" : "login"
          } else if (route.name === 'createnavigator') {
            iconName = 'assignment'
          } else if (route.name === 'viestit') {
            iconName = 'sms'
          } else if (route.name === 'tili') {
            iconName = 'person'
          }

          return <Icon name={iconName} size={size} color="white" />
        },
        tabBarStyle: { opacity: 0.7, backgroundColor: "black", height: 70 },
        tabBarLabelStyle: { fontFamily: 'Dosis', fontSize: 15, color: "white" }
      })

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="loginavigator" component={LoginNavigator} options={{ title: state.user ? "Minä" : "Kirjautuminen", headerShown: false, tabBarHideOnKeyboard: true }} />
                <Tab.Screen name="createnavigator" component={CreateNavigator} options={{ title: "Luo", headerShown: false, tabBarHideOnKeyboard: true }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}