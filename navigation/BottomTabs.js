import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './stacks/HomeStack';
import OrderStack from './stacks/OrderStack';
import PatientStack from './stacks/PatientStack';

import {useTheme} from '../theme/ThemeProvider';

const Tab = createMaterialTopTabNavigator();

export default function BottomTabs() {

  const {colors} = useTheme()



  const Item = (props) => {
    return(
        <View style={{
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <MaterialCommunityIcons name={props.focused ? props.filled : props.icon} size={30} color={props.focused ? colors.primary : colors.grey} />
            <Text size={10} color={props.focused ? colors.text : colors.grey}>{props.title}</Text>
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
          height: 80,
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIndicatorStyle:{
          position: 'absolute',
          top: 0,
          backgroundColor: colors.primary
        }
      }}
    >
      <Tab.Screen 
        name="OrderStack" 
        component={OrderStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <Item focused={focused} icon='cart-minus' filled='cart' title='Zamów' />
          ),
        }}
      />
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <Item focused={focused} icon='home-outline' filled='home' title='Głowna' />
          ),
        }}
      />
      <Tab.Screen 
        name="PatientStack" 
        component={PatientStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <Item focused={focused} icon='account-outline' filled='account' title='Pacjent' />
          ),
        }}
      />
    </Tab.Navigator>
  );
}