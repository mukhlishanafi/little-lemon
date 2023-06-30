import { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import HomeScreen from './screens/Home';
import SplashScreen from './screens/Splash';
import AuthContext from './context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'ONBOARDING_CHECK':
          return {
            ...prevState,
            isOnboardingCompleted: action.data.status,
            firstName: action.data.firstName,
            email: action.data.email,
            isLoading: false,
          };
        case 'ONBOARDING_IN':
          return {
            ...prevState,
            isSignout: false,
            isOnboardingCompleted: action.status,
            firstName: action.firstName,
            email: action.email,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isOnboardingCompleted: false,
            firstName: '',
            email: '',
          };
      }
    },
    {
      isLoading: true,
      isOnboardingCompleted: false,
      firstName: '',
      email: '',
      isSignout: false,
    }
  );

  useEffect(() => {
    const getStorageData = async () => {
      let isOnboardingCompleted = { status: false, firstName: '', email: '' };
      try {
        const getData = await AsyncStorage.getItem('onboarding-complete');
        if (getData != null) {
          isOnboardingCompleted = JSON.parse(getData);
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'ONBOARDING_CHECK', data: isOnboardingCompleted });
    };

    getStorageData();
  }, []);

  const authContext = useMemo(
    () => ({
      onboardingIn: async (data) => {
        dispatch({
          type: 'ONBOARDING_IN',
          status: data.status,
          firstName: data.firstName,
          email: data.email,
        });
      },
      signOut: async () => {
        try {
          dispatch({ type: 'SIGN_OUT' });
          let isOnboardingCompleted = {
            status: false,
            firstName: '',
            email: '',
          };
          await AsyncStorage.setItem(
            'onboarding-complete',
            JSON.stringify(isOnboardingCompleted)
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ ...authContext, ...state }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isOnboardingCompleted ? (
            <>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Profile' component={ProfileScreen} />
            </>
          ) : (
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
