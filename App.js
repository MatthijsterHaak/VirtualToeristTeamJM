import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import SkipLogin from './Screens/SkipLogin';
import Maps from './Screens/Maps';
import More from './Screens/More';
import LoginScreen from './Screens/Login';
import QrCode from './Screens/QRcode';
import RoutesInfo from './Screens/RoutesInfo';
import CycledRoutes from './Screens/Routes';
import DetailsRoute from './Screens/DetailsRoute';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ 
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#9AC31C',
      },
      headerTitleAlign: 'center',
      tabBarLabelStyle: {fontSize: 17, color: 'white'}, 
      tabBarActiveBackgroundColor: '#8cb319', 
      tabBarInactiveBackgroundColor: '#9AC31C',
      }} >
        <Tab.Screen  
          name="Route info" 
          component={RoutesInfo} 
          options={{
            tabBarIcon: () => <Ionicons name='help-circle-outline' type='ionicon' size={20} color={'white'}/>}}/>
        
        <Tab.Screen  
          name="Maps" 
          component={Maps} 
          options={{tabBarIcon: () => <Ionicons name='map-outline' type='ionicon' size={20} color={'white'}/>}} />

        <Tab.Screen  
          name="Routes" 
          component={CycledRoutes} 
          options={{tabBarIcon: () => <Ionicons name='bicycle-outline' type='ionicon' size={20} color={'white'}/>}}/>

        <Tab.Screen  
          name="More" 
          component={More} 
          options={{tabBarIcon: () => <Ionicons name='reorder-three-outline' type='ionicon' size={20} color={'white'}/>}}/>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Tab" component={HomeTabs} options={{headerShown: false}}/>
        <Stack.Screen name="SkipLogin" component={SkipLogin} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Scan QR code" component={QrCode} />
        <Stack.Screen name="Home" component={Maps}/>
        <Stack.Screen name="Settings" component={More}/>
        <Stack.Screen name="DetailsRoute" component={DetailsRoute}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;