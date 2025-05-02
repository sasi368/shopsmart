import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppIcons} from '../global/components/AppIcons';
import {Colors} from '../global/themes/Colors';
import CartScreen from '../screens/CartScreen';
import Profile from '../screens/Profile';
import BottomTabContents from './BottomTabContents';
import ProductListScreen from '../screens/ProductList';

const Tab = createBottomTabNavigator();

const OptionLists = [
  {
    route: 'ProductListBottomTab',
    label: 'Products',
    type: AppIcons.FontAwesome5,
    icon: 'list-alt',
    component: ProductListScreen,
    color: Colors.WHITE,
  },
  {
    route: 'CartBottomTab',
    label: 'Cart',
    type: AppIcons.AntDesign,
    icon: 'shoppingcart',
    component: CartScreen,
    color: Colors.WHITE,
  },

  {
    route: 'ProfileBottomTab',
    label: 'Profile',
    type: AppIcons.FontAwesome,
    icon: 'user-circle-o',
    component: Profile,
    color: Colors.WHITE,
  },
];

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,

        tabBarLabelStyle: {
          fontSize: 12,
          color: Colors.WHITE,
        },
        tabBarStyle: {
          height: 55,
          backgroundColor: Colors.PRIMARY,
          borderTopWidth: 0.5,
        },
      }}>
      {OptionLists?.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => (
                <BottomTabContents {...props} item={item} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
