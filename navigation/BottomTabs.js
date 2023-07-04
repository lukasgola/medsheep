import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeStack from './stacks/HomeStack';
import OrderStack from './stacks/OrderStack';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Order" component={OrderStack} />
      <Tab.Screen name="Home" component={HomeStack} />
    </Tab.Navigator>
  );
}