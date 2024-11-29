import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Screens/Home';
import Account from './Screens/Account';
import Camara from './Screens/Camara';
import Ciudad from './Screens/Ciudad';
import ImageScreen from './Screens/ImageScreen';


const Tab = createBottomTabNavigator();

console.log('App.js se está ejecutando');

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Cuenta" component={Account} />
        <Tab.Screen name="Cámara" component={Camara} />
        <Tab.Screen name="Ciudad" component={Ciudad} />
        <Tab.Screen name="Imágenes" component={ImageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
