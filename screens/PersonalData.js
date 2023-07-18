import React, { useEffect, useState } from 'react';
import {View, Dimensions, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Text} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';
import { useCurrentUser } from '../providers/CurrentUserProvider'; 

//Components
import DateTimePicker from '@react-native-community/datetimepicker';

//Firebase
import { auth, setPersonalData } from '../firebase/firebase-config';

import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from '../components/BottomSheet';

import {Picker} from '@react-native-picker/picker';


export default function PersonalData({navigation}){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const {currentUser, setCurrentUser} = useCurrentUser();


    const [isConfirming, setIsConfirming] = useState(false);

    const [isDatePickerVisible, setDatePickerVisibile] = useState(false);
    const [isHeightPickerVisible, setHeightPickerVisible] = useState(false);
    const [isWeightPickerVisible, setWeightPickerVisible] = useState(false);
    const [isBloodPickerVisible, setBloodPickerVisible] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [dateString, setDateString] = useState('Data urodzenia');

    const [height, setHeight] = useState(170);
    const [heightString, setHeightString] = useState('Wzrost');
    const [weight, setWeight] = useState(70);
    const [weightString, setWeightString] = useState('Waga');
    const [blood, setBlood] = useState('A Rh+');
    const [bloodString, setBloodString] = useState('Grupa krwi');

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        console.log(date)
    };

    const handleDateConfirm = () => {
        let month = date.getMonth()+1;
        setDateString(date.getDate() + ' / ' + month + ' / ' + date.getFullYear())
        setDatePickerVisibile(false);
    };

    const handleHeightConfirm = () => {
        setHeightString(height);
        setHeightPickerVisible(false);
    }

    const handleWeightConfirm = () => {
        setWeightString(weight);
        setWeightPickerVisible(false);
    }

    const handleBloodConfirm = () => {
        setBloodString(blood);
        setBloodPickerVisible(false);
    }

    const onConfirm = () => {
        setIsConfirming(true)
        setPersonalData(auth.currentUser.uid, dateString, heightString, weightString, bloodString).then(() => setIsConfirming(false))
        setCurrentUser(existingValues => ({
            ...existingValues,
            birthdate: dateString,
            height: height,
            weight: weight,
            blood: blood
        }))
        navigation.goBack();
    };

    
    const [metric, setMetric] = useState([]);
    
    useEffect(() => {

        if (currentUser.birthdate !== null){
            setDateString(currentUser.birthdate)
        }
        if (currentUser.height !== null){
            setHeight(currentUser.height)
            setHeightString(currentUser.height)
        }
        if (currentUser.weight !== null){
            setWeight(currentUser.weight)
            setWeightString(currentUser.weight)
        }
        if (currentUser.blood !== null){
            setBlood(currentUser.blood)
            setBloodString(currentUser.blood)
        }
        
        for(let i = 1; i < 250; i++){
            setMetric(oldArray => [...oldArray, i]);
        }
        console.log('update')
    }, [])

    

    const InputPicker = (props) => {
        return(
            <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <View style={{width: '100%', height: '100%'}}>    
                    <TouchableOpacity 
                        onPress={() => props.setVisible(true)}
                        style={{
                            width: '100%', 
                            height: '100%', 
                            flexDirection: 'row',
                            backgroundColor: colors.grey_l,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#e8e8e8',
                            borderWidth: 1
                        }}>
                        <View
                            style={{
                                width: 40,
                                paddingLeft: 10,
                                justifyContent: 'center'
                            }}
                            >
                                <Ionicons name={props.icon} size={16} color={colors.grey_d}/>
                        </View>
                        
                        <Text 
                            style={{
                                color: props.showValue !== props.placeholder ? colors.text : colors.grey_d,
                                fontSize: 12,
                            }}>{props.showValue}</Text>
                        {props.children}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

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
                
                <InputPicker 
                    icon={'calendar-outline'} 
                    placeholder={'Data urodzenia'} 
                    setVisible={setDatePickerVisibile}
                    showValue={dateString}
                />
                <BottomSheet 
                    visible={isDatePickerVisible} 
                    setModalVisible={setDatePickerVisibile}
                    text={'Podaj date urodzenia'}
                    onConfirm={handleDateConfirm}
                >
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChangeDate}
                        textColor={colors.text}
                    />
                </BottomSheet>

                <InputPicker 
                    icon={'man-outline'} 
                    placeholder={'Wzrost'} 
                    setVisible={setHeightPickerVisible}
                    showValue={heightString}
                />

                <BottomSheet 
                    visible={isHeightPickerVisible} 
                    setModalVisible={setHeightPickerVisible}
                    text={'Podaj wzrost (cm)'}
                    onConfirm={handleHeightConfirm}
                >
                    <Picker
                        selectedValue={height}
                        onValueChange={(itemValue, itemIndex) =>
                            setHeight(itemValue)
                        }>
                            {metric.map((item) => (
                                <Picker.Item label={item.toString()} value={item} key={item} />
                            ))}
                    </Picker>
                </BottomSheet>

                <InputPicker 
                    icon={'barbell-outline'} 
                    placeholder={'Waga'} 
                    setVisible={setWeightPickerVisible}
                    showValue={weightString}
                />

                <BottomSheet 
                    visible={isWeightPickerVisible} 
                    setModalVisible={setWeightPickerVisible}
                    text={'Podaj wagę (kg)'}
                    onConfirm={handleWeightConfirm}
                >
                    <Picker
                        selectedValue={weight}
                        onValueChange={(itemValue, itemIndex) =>
                            setWeight(itemValue)
                        }>
                        {metric.map((item) => (
                            <Picker.Item label={item.toString()} value={item} key={item} />
                        ))}
                    </Picker>
                </BottomSheet>

                <InputPicker 
                    icon={'water-outline'} 
                    placeholder={'Grupa krwi'} 
                    setVisible={setBloodPickerVisible}
                    showValue={bloodString}
                />

                <BottomSheet 
                    visible={isBloodPickerVisible} 
                    setModalVisible={setBloodPickerVisible}
                    text={'Podaj grupę krwi'}
                    onConfirm={handleBloodConfirm}
                >
                    <Picker
                        selectedValue={blood}
                        onValueChange={(itemValue, itemIndex) =>
                            setBlood(itemValue)
                        }>
                        <Picker.Item label="A Rh+" value="A Rh+" />
                        <Picker.Item label="A Rh-" value="A Rh-" />
                        <Picker.Item label="B Rh+" value="B Rh+" />
                        <Picker.Item label="B Rh-" value="B Rh-" />
                        <Picker.Item label="AB Rh+" value="AB Rh+" />
                        <Picker.Item label="AB Rh-" value="AB Rh-" />
                        <Picker.Item label="0 Rh+" value="0 Rh+" />
                        <Picker.Item label="0 Rh-" value="0 Rh-" />
                        
                    </Picker>
                </BottomSheet>

                <TouchableOpacity 
                    onPress={onConfirm}
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