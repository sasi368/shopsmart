import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash';
import BottomTab from './BottomTab';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};
export const ScreenTransactions: NativeStackNavigationOptions = {
  gestureEnabled: false,
  gestureDirection: 'horizontal',
  headerShown: false,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={ScreenTransactions}>
      {/* Initial screens */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name={'Home'} children={() => <BottomTab />} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
