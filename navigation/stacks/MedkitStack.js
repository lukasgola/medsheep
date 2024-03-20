import { TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useTheme} from '../../theme/ThemeProvider';

//Screens
import Kit from '../../screens/Kit';
import Medicine from '../../screens/Medicine';
import Medicines from '../../screens/Medicines';



const Stack = createNativeStackNavigator();

export default function MedkitStack({navigation}) {


  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='Apteczka'
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Stack.Screen 
        name="Apteczka" 
        component={Kit}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Leki')}
              title="Info"
              color="#fff"
            >
              <Ionicons name={'add-outline'} size={28} color={colors.primary} style={{marginTop: 4}} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen 
        name="Leki" 
        component={Medicines}
      />
      <Stack.Screen 
        name="Lek" 
        component={Medicine}
      />
    </Stack.Navigator>
  );
}