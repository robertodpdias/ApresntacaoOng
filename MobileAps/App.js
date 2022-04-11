import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from "./pages/Geral/Login/Index"
import ContainerHome from './pages/container_home/containerhome';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ContainerHome" component={ContainerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}