import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Account from '../pages/Account';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="Account" component={Account} />
  </Auth.Navigator>
);

export default AuthRoutes;
