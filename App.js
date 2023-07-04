import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';

//import { ThemeProvider, Button, createTheme } from '@rneui/themed';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
