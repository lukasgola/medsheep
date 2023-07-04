import { createStackNavigator } from '@react-navigation/stack';

import Main from '../../screens/Main';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}