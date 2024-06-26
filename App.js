import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from 'react';
import { View, Image, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


//Providers
import {ThemeProvider} from './theme/ThemeProvider';
import { useTheme } from './theme/ThemeProvider';

import { CurrentUserProvider } from './providers/CurrentUserProvider';
import { BasketProvider } from './providers/BasketProvider';
import { KitProvider } from './providers/KitProvider';
import { DataProvider } from './providers/DataProvider';


//Stacks
import BottomTabs from './navigation/BottomTabs';
import LoginStack from './navigation/stacks/LoginStack';


//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebase-config';


export default function App() {

  const [isUser, setIsUser] = useState(0);

  const {colors} = useTheme();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(2);
    } else {
      setIsUser(1);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <ThemeProvider>
        <CurrentUserProvider>
        <StatusBar/>
            {isUser == 2 ? 
              <BasketProvider>
                <KitProvider>
                  <DataProvider>
                    <BottomTabs/>
                  </DataProvider>
                </KitProvider>
              </BasketProvider> 
              : isUser == 0  ? <Loading /> : <LoginStack/> }
          
        </CurrentUserProvider>
      </ThemeProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
