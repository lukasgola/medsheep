import 'react-native-gesture-handler';
import { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//Providers
import {ThemeProvider} from './theme/ThemeProvider';
import { useTheme } from './theme/ThemeProvider';

import { CurrentUserProvider } from './providers/CurrentUserProvider';


//Stacks
import BottomTabs from './navigation/BottomTabs';
import LoginStack from './navigation/stacks/LoginStack';

import PersonalData from './screens/PersonalData';

//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebase-config';


export default function App() {

  const [isUser, setIsUser] = useState(0);

  const {colors} = useTheme();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setIsUser(2);
      // ...
    } else {
      setIsUser(1);
      // User is signed out
      // ...
    }
  });

  const Loading = () => {
    return(
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image 
            source={require ('./assets/medsheep_small.jpeg')} 
            style={{
                width: 120,
                height: 120
            }}
        />
        <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text
        }}>Medsheep</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <ThemeProvider>
        <CurrentUserProvider>
          {isUser == 2 ? <BottomTabs/> : isUser == 0  ? <Loading /> : <LoginStack/> }
        </CurrentUserProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}