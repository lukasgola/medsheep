import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Medicines from '../../screens/Medicines';
import Medicine from '../../screens/Medicine';
import AddToCart from '../../screens/AddToCart';

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
        name="Leki" 
        component={Medicines}
      />
      <Stack.Screen 
        name="Lek" 
        component={Medicine}
      />
      <Stack.Screen 
        name="Dodaj do koszyka" 
        component={AddToCart}
        options={{
          presentation: 'card',
          headerShown: false,

        }}
      />
    </Stack.Navigator>
  );
}