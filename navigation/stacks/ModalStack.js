import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TouchableOpacity, Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';

import { TransitionPresets } from '@react-navigation/stack'

//Screens
import AddToCalendar from '../../screens/AddToCalendar';
import Kit from '../../screens/Kit';


const Stack = createNativeStackNavigator();

export default function ModalStack({navigation}) {

  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='Główna'
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
      },
      }}
    >
      <Stack.Screen
        name="Nowy lek"
        component={AddToCalendar}
        options={{
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Apteczka"
        component={Kit}
        options={{
          headerShown: true,
          presentation: 'card'
        }}
      />

    </Stack.Navigator>
  );  
}