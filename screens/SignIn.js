import {View, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, Text, Image} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';
import {useForm, Controller} from 'react-hook-form';

//Components
import CustomInput from '../components/CustomInput';



export default function SignIn({navigation}){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const { control, handleSubmit, formState: {errors} } = useForm();

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const onSignIn = async data => {
        const { email, password} = data;
    };

    const onSignUp = () => {
        navigation.navigate('SignUp')
    }

    const onForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

    
    return (
        <KeyboardAvoidingView 
            behavior='padding'
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
                        fontWeight: 'bold'
                    }}>Medsheep</Text>
                </View>
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    
                    <CustomInput
                        name="email"
                        control={control}
                        placeholder="Email"
                        rules={{
                            required: 'Email jest wymagany',
                            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
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
                    style={{ 
                        width: '100%', 
                        height: 50, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: colors.primary
                    }}>
                    <Text style={{
                        color: colors.background, 
                        fontWeight: 'bold', 
                        fontSize: 18
                    }}>Zaloguj się</Text>
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