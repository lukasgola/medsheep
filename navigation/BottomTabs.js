import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeStack from './stacks/HomeStack';
import OrderStack from './stacks/OrderStack';
import PatientStack from './stacks/PatientStack';

import {useTheme} from '../theme/ThemeProvider';

const Tab = createMaterialTopTabNavigator();

export default function BottomTabs() {

  const {colors} = useTheme()

  return (
    <Tab.Navigator
    initialRouteName='HomeStack'
      tabBarPosition='bottom'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
          borderTopColor: 'grey',
          borderTopWidth: 1,
        }
      }}
    >
      <Tab.Screen name="OrderStack" component={OrderStack} />
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="PatientStack" component={PatientStack} />
    </Tab.Navigator>
  );
}