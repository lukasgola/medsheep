import { createStackNavigator } from '@react-navigation/stack';

import Patient from '../../screens/Patient';

const Stack = createStackNavigator();

export default function PatientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Patient" component={Patient} />
    </Stack.Navigator>
  );
}