import { View, Text, Animated, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeStack from './stacks/HomeStack';
import OrderStack from './stacks/OrderStack';
import PatientStack from './stacks/PatientStack';
import MedkitStack from './stacks/MedkitStack';

import Notifications from '../screens/Notificaition';

import {useTheme} from '../theme/ThemeProvider';

const Tab = createMaterialTopTabNavigator();

export default function BottomTabs() {

  const {colors} = useTheme()

  const av = new Animated.Value(0);
  av.addListener(() => {return});

  const Item = (props) => {
    return(
        <View style={{
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Ionicons name={props.focused ? props.filled : props.icon} size={25} color={props.focused ? colors.primary : colors.grey} />
            <Text style={{color: props.focused ? colors.text : colors.grey_d, fontSize: 12}}>{props.title}</Text>
        </View>
    )
  }


  return (
    <Tab.Navigator
    initialRouteName='HomeStack'
      tabBarPosition='bottom'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5
        },
        tabBarIndicatorStyle:{
          position: 'absolute',
          top: 0,
          backgroundColor: colors.primary
        },
        swipeEnabled: false
        
      }}
      screenListeners={{
        focus: () => {
          Animated.timing(av, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        },
      }}
    >
      <Tab.Screen 
        name="MedkitStack" 
        component={MedkitStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <Item focused={focused} icon='cart-outline' filled='cart' title='Apteczka' />
          ),
        }}
      />
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <Item focused={focused} icon='home-outline' filled='home' title='Główna' />
          ),
        }}
      />
      <Tab.Screen 
        name="PatientStack" 
        component={PatientStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <Item focused={focused} icon='person-outline' filled='person' title='Pacjent' />
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{
          tabBarIcon: ({focused}) => (
            <Item focused={focused} icon='notifications-outline' filled='person' title='Powiadomienia' />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}