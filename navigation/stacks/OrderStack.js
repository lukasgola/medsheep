import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useTheme} from '../../theme/ThemeProvider';

//Screens
import Medicines from '../../screens/Medicines';
import Medicine from '../../screens/Medicine';
import PersonalData from '../../screens/PersonalData';



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
        name="Dane osobiste" 
        component={PersonalData}
      />
    </Stack.Navigator>
  );
}