// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ScreenA from './screens/ScreenA';
import ScreenB from './screens/ScreenB';
import ScreenC from './screens/ScreenC';
import ScreenD from './screens/ScreenD';
import ScreenE from './screens/ScreenE';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ScreenA} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen name="ScreenA" component={ScreenA} />
        <Stack.Screen name="ScreenB" component={ScreenB} />
        <Stack.Screen name="ScreenC" component={ScreenC} />
        <Stack.Screen name="ScreenD" component={ScreenD} />
        <Stack.Screen name="ScreenE" component={ScreenE} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
