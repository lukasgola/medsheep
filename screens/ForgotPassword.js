import React, { useState } from 'react';
import {View, Dimensions, TouchableOpacity, Alert, Text} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useForm, Controller} from 'react-hook-form';
import { useRoute } from '@react-navigation/native';

//Components
import CustomInput from '../components/CustomInput';


export default function ForgotPassword({navigation}){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();

    const route = useRoute();

    const { control, handleSubmit, watch } = useForm({
        defaultValues: {email: route?.params?.email}
    });

    const email = watch('email');

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const onSend = async data => {

        navigation.navigate('SignIn')
    };

    const onSignIn = () => {
        navigation.navigate('SignIn');
    };



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: colors.background }}>
            <View style={{ width: 0.9*width }}>
                <View style={{ width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Reset password</Text>
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
                    />
                </View>
                <TouchableOpacity 
                    onPress={handleSubmit(onSend)}
                    style={{ 
                        width: '100%', 
                        height: 50, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: colors.primary
                    }}>
                    <Text>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={onSignIn}
                    style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                    <Text>Back to  </Text>
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}