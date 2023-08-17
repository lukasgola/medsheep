import { TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useTheme} from '../../theme/ThemeProvider';

//Screens
import Medicines from '../../screens/Medicines';
import Medicine from '../../screens/Medicine';
import Basket from '../../screens/Basket';



const Stack = createNativeStackNavigator();

export default function OrderStack({navigation}) {


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
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Koszyk')}
              title="Info"
              color="#fff"
            >
              <Ionicons name={'cart-outline'} size={28} color={colors.primary} style={{marginTop: 4}} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen 
        name="Lek" 
        component={Medicine}
      />
      <Stack.Screen 
        name="Koszyk" 
        component={Basket}
      />
    </Stack.Navigator>
  );
}