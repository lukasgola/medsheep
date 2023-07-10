import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useTheme} from '../../theme/ThemeProvider';

//Screens
import Main from '../../screens/Main';
import Calendar from '../../screens/Calendar';
import Doctor from '../../screens/Doctor';
import Search from '../../screens/Search';
import Results from '../../screens/Results';


const Stack = createNativeStackNavigator();

export default function HomeStack() {

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