import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './src/screens/splash';
import OnboardScreen from './src/screens/onboard';
import SigninScreen from './src/screens/signin';
import SignupScreen from './src/screens/signup';
import LoginScreen from './src/screens/login';
import NumberScreen from './src/screens/number';
import VerificationScreen from './src/screens/verification';
import LocationScreen from './src/screens/location';
import HomeScreen from './src/screens/home';
import ExploreScreen from './src/screens/explore';
import ProductDetailScreen from './src/screens/productdetail';
import BeveragesScreen from './src/screens/beverages';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#53B175', 
        tabBarInactiveTintColor: '#181725',
        tabBarStyle: { height: 70, paddingBottom: 10 },
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Shop') iconName = '🛒';
          else if (route.name === 'Explore') iconName = '🔍';
          else if (route.name === 'Cart') iconName = '🛍️';
          else if (route.name === 'Favourite') iconName = '❤️';
          else iconName = '👤';
          return <Text style={{ color, fontSize: 24 }}>{iconName}</Text>;
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Explore" component={() => <View />} />
      <Tab.Screen name="Cart" component={() => <View />} />
      <Tab.Screen name="Favourite" component={() => <View />} />
      <Tab.Screen name="Account" component={() => <View />} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboard" component={OnboardScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Number" component={NumberScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}