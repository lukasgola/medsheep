import 'react-native-gesture-handler';
import {Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useTheme} from '../../theme/ThemeProvider';

//Screens
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import ForgotPassword from '../../screens/ForgotPassword';


const Stack = createNativeStackNavigator();

export default function LoginStack() {

    const {colors} = useTheme();

    
    return(
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.primary,
                headerStyle:{
                    backgroundColor: colors.background
                },
                headerShown: false
            }}
        >
            <Stack.Screen 
                name='SignIn' 
                component={SignIn} 
                options={{
                    headerTitle: () => <Text>Sign In</Text>
                }}
            />
            <Stack.Screen 
                name='SignUp' 
                component={SignUp} 
                options={{
                    headerTitle: () => <Text>Sign Up</Text>
                }}
            />
            <Stack.Screen 
                name='ForgotPassword' 
                component={ForgotPassword} 
                options={{
                    headerTitle: () => <Text>Forgot Password</Text>
                }}
            />

        </Stack.Navigator>
    ) 
}