import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useTheme} from '../../theme/ThemeProvider';

//Screens


const Stack = createNativeStackNavigator();

export default function FirstRunStack() {

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
      <Stack.Screen name="Medsheep" component={Main} />
      <Stack.Screen name="Kalendarz" component={Calendar} />
      <Stack.Screen name="Lekarz" component={Doctor} />
      <Stack.Screen name="Szukaj" component={Search} />
      <Stack.Screen name="Wyniki" component={Results} />
    </Stack.Navigator>
  );
}