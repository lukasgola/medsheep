import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TouchableOpacity, Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import { useData } from '../../providers/DataProvider';

import { TransitionPresets } from '@react-navigation/stack'

//Screens
import Main from '../../screens/Main';
import Calendar from '../../screens/Calendar';
import Doctor from '../../screens/Doctor';
import Search from '../../screens/Search';
import Results from '../../screens/Results';


import ModalStack from './ModalStack';

const Stack = createNativeStackNavigator();

export default function HomeStack({navigation}) {

  const {colors} = useTheme();
  const { data, setData } = useData();

  return (
    <Stack.Navigator
      initialRouteName='Kalendarz'
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
      },
      }}
    >
      <Stack.Screen 
        name="Kalendarz" 
        component={Calendar} 
        options={{
          headerRight: () => (
            <View style={{
              width: 30,
              height: 30
            }}>
              <TouchableOpacity
                onPress={() => [navigation.navigate('modal'), setData({})]}
                title="Info"
                color="#fff"
              >
                <Ionicons name={'add-outline'} size={25} color={colors.primary} style={{marginTop: 4}} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen 
        name="modal" 
        component={ModalStack}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />

    </Stack.Navigator>
  );  
}