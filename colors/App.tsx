
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import StackNavigation from './screens';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation/>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
