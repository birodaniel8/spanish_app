import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import PracticeScreen from "./screens/PracticeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PracticeDoneScreen from "./screens/PracticeDoneScreen";

import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/merienda";
import { Merienda_700Bold } from "@expo-google-fonts/merienda";
import { Montserrat_400Regular, Montserrat_400Regular_Italic, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { backgroundColor } from "./Styles";

// Create a Stack Navigator and set the global screen settings:
const Stack = createStackNavigator();
const globalScreenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: backgroundColor,
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Merienda_700Bold,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Practice" component={PracticeScreen} />
            <Stack.Screen name="PracticeDone" component={PracticeDoneScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
