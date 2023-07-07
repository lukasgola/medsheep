import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import {ThemeProvider} from './theme/ThemeProvider';

import BottomTabs from './navigation/BottomTabs';
import LoginStack from './navigation/stacks/LoginStack';


export default function App() {

  const user = true;

  return (
    <NavigationContainer>
      <ThemeProvider>
         <LoginStack/>
      </ThemeProvider>
    </NavigationContainer>
  );
}
