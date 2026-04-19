import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Splash from './src/screens/splash';
import Onboard from './src/screens/onboard';
import SignIn from './src/screens/signin';
import Number from './src/screens/number';
import Verification from './src/screens/verification';
import SelectLocation from './src/screens/location';
import Login from './src/screens/login';
import SignUp from './src/screens/signup';
import Home from './src/screens/home';
import ProductDetail from './src/screens/productdetail';
import Beverages from './src/screens/beverages';

import Explore from './src/screens/explore';
import Search from './src/screens/search';
import Filters from './src/screens/filter'; 
import Cart from './src/screens/mycart';
import Favorites from './src/screens/favorites';

const Stack = createStackNavigator();
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
      <Tab.Screen name="Shop" component={Home} />
      
      <Tab.Screen name="Explore" component={Explore} /> 
      
      <Tab.Screen name="Cart" component={Cart} /> 
      <Tab.Screen name="Favourite" component={Favorites} />
      
      <Tab.Screen name="Account" component={() => <View />} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Number" component={Number} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        
        <Stack.Screen name="MainApp" component={MainTabs} />
        
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Filters" component={Filters} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Beverages" component={Beverages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}