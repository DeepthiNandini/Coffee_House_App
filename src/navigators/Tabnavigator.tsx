import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import Cart from '../screens/Cart';
import FavoriteScreen from '../screens/FavoriteScreen';
import OrderHistory from '../screens/OrderHistory';
import Customicon from '../components/Customicon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const tab = createBottomTabNavigator();

const Tabnavigator = () => {
  return (
    <tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => {
          <BlurView
            overlayColor=""
            blurAmount={10}
            style={styles.Blurviewstyles}
          />;
        },
      }}>
      <tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Customicon
              name="home"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Customicon
              name="cart"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <tab.Screen
        name="favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Customicon
              name="like"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <tab.Screen
        name="orderHistory"
        component={OrderHistory}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Customicon
              name="bell"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
    </tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transperant',
  },
  Blurviewstyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default Tabnavigator;
