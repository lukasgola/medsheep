import { createStackNavigator } from '@react-navigation/stack';

import Patient from '../../screens/Patient';
import PersonalData from '../../screens/PersonalData';

const Stack = createStackNavigator();

import { useTheme } from '../../theme/ThemeProvider';

export default function PatientStack() {

  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='Zamów'
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Stack.Screen name="Pacjent" component={Patient} />
      <Stack.Screen name="Dane osobiste" component={PersonalData} />
    </Stack.Navigator>
  );
}