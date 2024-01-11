import { useState } from 'react';
import {View, Dimensions, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Text, Image} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';
import {useForm, Controller} from 'react-hook-form';


//Components
import CustomInput from '../components/CustomInput';

//Firebase
import { signIn } from '../firebase/firebase-config';



export default function SignIn({navigation}){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const { control, handleSubmit, formState: {errors} } = useForm();

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    const [ isLogging, setIsLogging ] = useState();

    const onSignIn = async data => {
        setIsLogging(true);
        const { email, password } = data;
        signIn(email, password).then(() => setIsLogging(false));
    };

    const onSignUp = () => {
        navigation.navigate('SignUp')
    }

    const onForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

    
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
            <View style={{ width: 0.9*width }}>
                <View style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Image 
                        source={require ('../assets/medsheep_small.jpeg')} 
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
                    <Text style={{
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}>Testowe konto</Text>
                    <Text>Email: jan@kowalski.pl</Text>
                    <Text style={{
                        marginBottom: 10
                    }}>Password: Sernik123</Text>
                </View>
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
    
                    <CustomInput
                        name="email"
                        control={control}
                        placeholder="Email"
                        rules={{
                            required: 'Email jest wymagany',
                            pattern: {value: EMAIL_REGEX, message: 'Email jest nieprawidłowy'},
                        }}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'mail-outline'}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <CustomInput
                        name="password"
                        placeholder="Hasło"
                        secureTextEntry
                        control={control}
                        rules={{
                            required: 'Hasło jest wymagane',
                            minLength: {
                            value: 8,
                            message: 'Hasło musi mieć przynajmniej 8 znaków',
                            },
                        }}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'lock-closed-outline'}
                    />
                </View>
                <TouchableOpacity 
                    onPress={handleSubmit(onSignIn)}
                    disabled={isLogging}
                    style={{ 
                        width: '100%', 
                        height: 50, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: colors.primary
                    }}>
                        {isLogging ? <ActivityIndicator color={colors.background} /> : 
                            <Text style={{
                                color: colors.background, 
                                fontWeight: 'bold', 
                                fontSize: 18
                            }}>Zaloguj się</Text>
                        }
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={onSignUp}
                    style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                    <Text style={{color: colors.grey_d}}>Nie masz konta?</Text>
                    <Text style={{color: colors.primary}}>  Zarejestruj się!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={onForgotPassword}
                    style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{color: colors.grey_d}}>Zapomniałeś hasła?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
        
}