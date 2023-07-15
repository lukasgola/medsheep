import React, { useState } from 'react';
import {View, Dimensions, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Text} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

//Components
import CustomInput from '../components/CustomInput';
import DateTimePickerModal from "react-native-modal-datetime-picker";

//Firebase
import { createUser } from '../firebase/firebase-config';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PersonalData(){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const navigation = useNavigation();
    const {control, handleSubmit, watch} = useForm();


    const [isConfirming, setIsConfirming] = useState(false);

    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('Data urodzenia');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const onConfirm = async data => {
        setIsRegistering(true)
        const {name, lastName, email, password} = data;  
        createUser(name, lastName, email, password).then(() => setIsRegistering(false))
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setDate(date)
        let month = date.getMonth()+1;
        setDateString(date.getDate() + ' / ' + month + ' / ' + date.getFullYear())
        hideDatePicker();
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: colors.background }}>
            <View style={{ width: 0.9*width }}>
                <View style={{ width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>Podstawowe dane</Text>
                </View>
                
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Controller
                        control={control}
                        name={'date'}
                        rules={{
                            required: 'Date is required',
                        }}
                        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                            <View style={{width: '100%', height: '100%'}}>    
                                <TouchableOpacity 
                                    onPress={showDatePicker}
                                    style={{
                                        width: '100%', 
                                        height: '100%', 
                                        flexDirection: 'row',
                                        backgroundColor: colors.grey_l,
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderColor: error ? 'red' : '#e8e8e8',
                                        borderWidth: 1
                                    }}>
                                    <View
                                        style={{
                                            width: 40,
                                            paddingLeft: 10,
                                            justifyContent: 'center'
                                        }}
                                        >
                                            <Ionicons name={'calendar-outline'} size={16} color={colors.grey_d}/>
                                    </View>
                                    
                                    <Text 
                                        style={{
                                            color: dateString !== 'Data urodzenia' ? colors.text : colors.grey_d,
                                            fontSize: 12,
                                            
                                        }}>{dateString}</Text>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={(date) => [onChange(date), handleDateConfirm(date)]}
                                        onCancel={hideDatePicker}
                                        themeVariant='light'
                                        isDarkModeEnabled={false}
                                        buttonTextColorIOS={colors.primary}
                                        selected={value}
                                        onBlur={onBlur}
                                        confirmTextIOS='Wybierz'
                                        cancelTextIOS='Cofnij'
                                    /> 
                                </TouchableOpacity>
                            {error && (
                                <View style={{width: '100%'}}>
                                <Text 
                                    style={{
                                        color: 'red'}}>{error.message || 'Error'}</Text>
                                </View>
                                
                            )}
                            </View>
                        )}
                    />
                </View>
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    
                    <CustomInput
                        name="height"
                        placeholder="Wzrost"
                        control={control}
                        rules={{required: 'Wzrost jest wymagany'}}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'man-outline'}
                        keyboardType={'number-pad'}
                    />
                </View>
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <CustomInput
                        name="weight"
                        control={control}
                        placeholder="Waga"
                        rules={{
                            required: 'Waga jest wymagana',
                        }}
                        size={12} 
                        color={colors.grey_l}
                        icon={'barbell-outline'}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <CustomInput
                        name="blood"
                        placeholder="Grupa krwi"
                        secureTextEntry
                        control={control}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'water-outline'}
                    />
                </View>

                <TouchableOpacity 
                    onPress={handleSubmit(onConfirm)}
                    disabled={isConfirming}
                    style={{ 
                        width: '100%', 
                        height: 50, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: colors.primary
                    }}>
                        {isConfirming ? <ActivityIndicator color={colors.background}/> : 
                            <Text style={{
                                color: colors.background, 
                                fontWeight: 'bold', 
                                fontSize: 18
                            }}>Potwierdź</Text>
                        }
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}