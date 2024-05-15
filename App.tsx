import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabnavigator from './src/navigators/Tabnavigator';
import Details from './src/screens/Details';
import Payments from './src/screens/Payments';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const stack = createNativeStackNavigator();
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen
          name="Tab"
          component={Tabnavigator}
          options={{animation: 'slide_from_bottom'}}
        />
        <stack.Screen
          name="Details"
          component={Details}
          options={{animation: 'slide_from_bottom'}}
        />
        <stack.Screen
          name="Payments"
          component={Payments}
          options={{animation: 'slide_from_bottom'}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({});
export default App;
