import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Draw from './src/screens/draw';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import type {CanvasProps} from '@benjeau/react-native-draw';
import type {
  BrushPreviewProps,
  BrushPropertiesProps,
  CanvasControlsProps,
  ColorPickerProps,
} from '@benjeau/react-native-draw-extras';

export type RootStackParamList = {
  Home: undefined;
  CanvasExample: CanvasProps;
  BrushPreviewExample: BrushPreviewProps;
  BrushPropertiesExample: BrushPropertiesProps;
  CanvasControlsExample: CanvasControlsProps;
  ColorPickerExample: ColorPickerProps;
  ExampleSelection: {
    type: 'canvas' | 'brushPreview' | 'brushProperties' | 'canvasControls' | 'colorPicker';
    title: string;
  };
  SimpleExample: undefined;
  MoreComplexExample: undefined;
  ExtrasExample: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SimpleExample" component={Draw} options={{title: 'Simple Example'}} />
          <Stack.Screen name="ExtrasExample" component={Draw} options={{title: 'Extras Example'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
