import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import HomeScreen from "./Components/HomeScreen";
import SplashScreen from "./Components/SplashScreen";
import ProfileScreen from "./Components/ProfileScreen";
import AddUserScreen from "./Components/AddUserScreen";

const Stack = createStackNavigator();

export default function App() {

  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName={"SplashScreen"}>
       <Stack.Screen name={"SplashScreen"} component={SplashScreen} options={{headerShown: false}}/>
       <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} options={{title: "Profile",}}/>
       <Stack.Screen name={"AddUserScreen"} component={AddUserScreen} options={{title: "Add User",}}/>
       <Stack.Screen name={"HomeScreen"} component={HomeScreen} options={{title:"Stream", headerShown: false,
           headerStyle:{
            backgroundColor: '#ffffff',
           }
       }} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
