import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/state/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/Home/Home';
import { LoginScreen } from './src/screens/Login/Login';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
}

const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <PaperProvider theme={DefaultTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
          </Stack.Navigator>
        </PaperProvider>
      </ReduxProvider>
    </NavigationContainer>
  );
}

export default App;
