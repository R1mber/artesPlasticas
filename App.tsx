import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Draw from './src/screens/draw';
import Tema from './src/screens/tema';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tema"
          component={Tema}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Draw" component={Draw} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
