import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Order from '../../screens/Order';

import {useTheme} from '../../theme/ThemeProvider';

const Stack = createNativeStackNavigator();

export default function OrderStack() {


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
      <Stack.Screen 
        name="Zamów" 
        component={Order} 
      />
    </Stack.Navigator>
  );
}