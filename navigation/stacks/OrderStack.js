import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Main';

const Stack = createStackNavigator();

export default function OrderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}