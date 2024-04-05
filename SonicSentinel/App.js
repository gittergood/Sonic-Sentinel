import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import add from "./Screens/add";
import paths from "./Screens/paths";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Overlay, Button, FAB, Icon, Divider, ButtonGroup, Input  } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function App() {
  <NavigationContainer>
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'add') {
              iconName = focused
                ? 'home' : 'home-outline';
            } else if (route.name === 'paths') {
              iconName = focused ? 'menu' : 'menu-outline';
            }
                        // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="add" component={add} />
        <Tab.Screen name="paths" component={paths} />
      </Tab.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#000',
  },
  title: {
    color: '#000',
    // paddingTop:'10px',
    paddingBottom:'20px',
    fontSize: 20
  }
});
