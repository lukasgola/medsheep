import React, { useState } from 'react';
import {View, Dimensions, TouchableOpacity, Image, KeyboardAvoidingView, Text} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';
import {useForm} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

//Components
import CustomInput from '../components/CustomInput';


export default function SignUp(){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const navigation = useNavigation();
    const {control, handleSubmit, watch} = useForm();

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    const pwd = watch('password');


    const onRegister = async data => {
        const {username, email, password} = data;  
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
                    }}>Create an account</Text>
                </View>
                
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    
                    <CustomInput
                        name="username"
                        placeholder="Username"
                        control={control}
                        rules={{required: 'Username is required'}}
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
                            required: 'Email is required',
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
                        placeholder="Password"
                        secureTextEntry
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                            value: 3,
                            message: 'Password should be minimum 3 characters long',
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
                        placeholder="Repeat Password"
                        secureTextEntry
                        control={control}
                        rules={{
                            validate: value => value === pwd || 'Password do not match',
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
                    }}>Register</Text>
                </TouchableOpacity>
                <View 
                    style={{ width: '100%', marginTop: 10, flexWrap:'wrap', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{color: colors.grey_d}}>By registering you confirm that you accept our </Text>
                    <TouchableOpacity
                        onPress={onTerms}
                    >
                        <Text style={{color: colors.primary}}>Terms of Use </Text>
                    </TouchableOpacity>
                    <Text style={{color: colors.grey_d}}>and </Text>
                    <TouchableOpacity
                        onPress={onPolicy}
                    >
                        <Text style={{color: colors.primary}}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={onSignIn}
                    style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                    <Text style={{color: colors.grey_d}}>Have an account?</Text>
                    <Text style={{color: colors.primary}}>  Sign in!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}