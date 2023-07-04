import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';

import {ThemeProvider} from './theme/ThemeProvider';


export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <BottomTabs/>
      </ThemeProvider>
    </NavigationContainer>
  );
}
