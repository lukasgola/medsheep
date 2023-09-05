import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TouchableOpacity, Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';

//Screens
import Main from '../../screens/Main';
import Calendar from '../../screens/Calendar';
import Doctor from '../../screens/Doctor';
import Search from '../../screens/Search';
import Results from '../../screens/Results';
import AddToCalendar from '../../screens/AddToCalendar';


const Stack = createNativeStackNavigator();

export default function HomeStack({navigation}) {

  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='Główna'
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
      },
      }}
    >
      <Stack.Screen name="Medsheep" component={Main} />
      <Stack.Screen 
        name="Kalendarz" 
        component={Calendar} 
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Nowy lek')}
              title="Info"
              color="#fff"
            >
              <Ionicons name={'add-outline'} size={28} color={colors.primary} style={{marginTop: 4}} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="Lekarz" component={Doctor} />
      <Stack.Screen name="Szukaj" component={Search} />
      <Stack.Screen name="Wyniki" component={Results} />
      <Stack.Screen 
        name="Nowy lek" 
        component={AddToCalendar}
        options={{
          presentation: 'modal',
          headerRight: () => (
            <TouchableOpacity
              //onPress={() => navigation.navigate('Nowy lek')}
              title="Info"
              color="#fff"
            >
              <Text style={{
                color: colors.primary,
                fontSize: 18,
                fontWeight: 'bold'
              }}>Dodaj</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Kalendarz')}
              title="Info"
              color="#fff"
            >
              <Text style={{
                color: colors.primary,
                fontSize: 18,
              }}>Anuluj</Text>
            </TouchableOpacity>
          )
        
        }}
        />
    </Stack.Navigator>
  );
}