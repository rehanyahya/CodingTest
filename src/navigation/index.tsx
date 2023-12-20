import React, {useRef, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {Home, Feedback} from '../screens';
import {Text, Pressable} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Feedback: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Trending GIFS',
          }}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{
            title: 'Feedback Form',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
