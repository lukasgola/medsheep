import React, { useState } from 'react';
import {View, Dimensions, TouchableOpacity, Image, KeyboardAvoidingView, Text} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';
import {useForm} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

//Components
import CustomInput from '../components/CustomInput';


//Firebase
import { createUser } from '../firebase/firebase-config';

export default function SignUp(){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const navigation = useNavigation();
    const {control, handleSubmit, watch} = useForm();

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    const pwd = watch('password');


    const onRegister = async data => {
        const {email, password} = data;  
        createUser(email, password);
    };

    const onTerms = () => {
        
    }

    const onPolicy = () => {

    }

    const onSignIn = () => {
        navigation.navigate('SignIn')
    }


    return (
        <KeyboardAvoidingView 
            behavior='padding'
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: colors.background }}>
            <View style={{ width: 0.9*width }}>
                <View style={{ width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>Utwórz konto</Text>
                </View>
                
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    
                    <CustomInput
                        name="name"
                        placeholder="Imie"
                        control={control}
                        rules={{required: 'Imię jest wymagane'}}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'lock-closed-outline'}
                    />
                </View>
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    
                    <CustomInput
                        name="surname"
                        placeholder="Nazwisko"
                        control={control}
                        rules={{required: 'Nazwisko jest wymagane'}}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'lock-closed-outline'}
                    />
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
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <CustomInput
                        name="password-repeat"
                        placeholder="Powtórz hasło"
                        secureTextEntry
                        control={control}
                        rules={{
                            validate: value => value === pwd || 'Hasła nie są takie same',
                        }}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'lock-closed-outline'}
                    />
                </View>

                <TouchableOpacity 
                    onPress={handleSubmit(onRegister)}
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
                    }}>Zarejestruj</Text>
                </TouchableOpacity>
                <View 
                    style={{ width: '100%', marginTop: 10, flexWrap:'wrap', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{color: colors.grey_d}}>Rejestrując się akceptujesz </Text>
                    <TouchableOpacity
                        onPress={onTerms}
                    >
                        <Text style={{color: colors.primary}}>Regulamin </Text>
                    </TouchableOpacity>
                    <Text style={{color: colors.grey_d}}>i </Text>
                    <TouchableOpacity
                        onPress={onPolicy}
                    >
                        <Text style={{color: colors.primary}}>Politykę Prywatności</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={onSignIn}
                    style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                    <Text style={{color: colors.grey_d}}>Masz ju konto?</Text>
                    <Text style={{color: colors.primary}}>  Zaloguj się!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}