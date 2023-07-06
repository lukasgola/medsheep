import { createStackNavigator } from '@react-navigation/stack';

import Main from '../../screens/Main';
import Calendar from '../../screens/Calendar';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName='Główna'
    >
      <Stack.Screen name="Główna" component={Main} />
      <Stack.Screen name="Kalendarz" component={Calendar} />
    </Stack.Navigator>
  );
}