import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Alert, TouchableOpacity, Dimensions, ScrollView, Text} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';
import {useForm, Controller} from 'react-hook-form';


import BottomSheet from '../components/BottomSheet';


//Components
import CustomInput from '../components/CustomInput';

import DateTimePicker from '@react-native-community/datetimepicker';

import {Picker} from '@react-native-picker/picker';

//Firebase
import { addEvent } from '../firebase/firebase-config';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default function AddToCalendar(){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();

    const frequencies = [
        {
            id: 1,
            text: 'Codziennie',
        },
        {
            id: 2,
            text: 'Co 2 dni',
        },
        {
            id: 3,
            text: 'Co 3 dni',
        },
    ]

    const [freq, setFreq] = useState(new Date());
    const [freqString, setFreqString] = useState('Częstotliwość')

    const [time, setTime] = useState(new Date())
    const [timeString, setTimeString] = useState('Wybierz godzinę')

    const [eventLocation, setEventLocation] = useState(null)
    const [address, setAddress] = useState(null);

    const [category, setCategory] = useState('Party')

    const [type, setType] = useState('Private');
    const [place, setPlace] = useState('Indoor');

    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleFreqConfirm = () => {
        setFreqString(freq);
    }

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
    };

    const handleTimeConfirm = () => {
        setTime(time)
        setTimeString(time.getHours() + ':' + time.getMinutes())
    };



    const { control, handleSubmit, formState: {errors} } = useForm();

    const onCreateEvent = async data => {
        Alert.alert('New Event', 'Do you want to public this event?', [
        {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
        },
        {
            text: 'Yes',
            onPress: () => {
                const { title, maxGuests, description} = data;
                const event = {
                    title: title,
                    day: date.getDate(),
                    month: date.getMonth()+1,
                    year: date.getFullYear(),
                    time_hour: time.getHours(),
                    time_minute: time.getMinutes(),
                    type: type,
                    place: place,
                    actGuests: 0,
                    maxGuests: maxGuests,
                    description:  description ? description : 'none',
                    latitude: eventLocation.latitude,
                    longitude: eventLocation.longitude,
                    likes: 0,
                    category: category
                }
                addEvent(event);
            }},
        ]);
        
    };

    return (
        <KeyboardAvoidingView 
            keyboardVerticalOffset={50}
            behavior= {Platform.OS == "ios" ? "padding" : "height"}
            style={{flex: 1,alignItems: 'center', backgroundColor: colors.background}}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{width: width*0.9}}
            >
                <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 10}}>
                    <Text>New</Text>
                    <Text> Event</Text>
                </View>

                <View style={{width: '100%', alignItems: 'center', marginTop: 10, marginBottom: 30}}>
                    <Text>Complete information about the event.</Text>
                </View>

                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <CustomInput
                        name="title"
                        control={control}
                        placeholder="Title"
                        rules={{
                            required: 'Title is required',
                        }}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'code-working-outline'}
                    />
                </View>

                <View style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20
                }}> 
                    <View style={{width: '47.5%', height: '100%'}}>    
                        <TouchableOpacity 
                            onPress={() => setDatePickerVisible(true)}
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
                                    <Ionicons name={'calendar-outline'} size={16} color={colors.grey_d}/>
                            </View>
                            
                            <Text>{freqString}</Text>
                            <BottomSheet 
                                visible={isDatePickerVisible} 
                                setModalVisible={setDatePickerVisible}
                                text={'Podaj częstotliwość'}
                                onConfirm={handleFreqConfirm}
                            >
                                <Picker
                                    selectedValue={freq}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setFreq(itemValue)
                                    }>
                                        {frequencies.map((item) => (
                                            <Picker.Item label={item.text.toString()} value={item.text} key={item.id} />
                                        ))}
                                </Picker>
                            </BottomSheet>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: '47.5%', height: '100%'}}>     
                        <TouchableOpacity 
                            onPress={() => setTimePickerVisible(true)}
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
                                    <Ionicons name={'time-outline'} size={16} color={colors.grey_d}/>
                            </View>
                            
                            <Text>{timeString}</Text>
                            <BottomSheet 
                                visible={isTimePickerVisible} 
                                setModalVisible={setTimePickerVisible}
                                text={'Podaj godzinę'}
                                onConfirm={handleTimeConfirm}
                            >
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={time}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChangeTime}
                                    textColor={colors.text}
                                />
                            </BottomSheet>
                        </TouchableOpacity>
                    </View>
                
                </View>
                

                <View style={{width: '100%', marginTop: 20}}>
                    <Text>Event type</Text>
                </View>

                <View style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}> 
                    <TouchableOpacity 
                        onPress={() => setType('Private')}
                        style={{
                            width: '47.5%', 
                            height: '100%', 
                            flexDirection: 'row',
                            backgroundColor: colors.grey_l,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: type == 'Private' ? colors.primary : '#e8e8e8',
                            borderWidth: 1
                        }}>
                        <Text>Private</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setType('Professional')}
                        style={{
                            width: '47.5%', 
                            height: '100%', 
                            flexDirection: 'row',
                            backgroundColor: colors.grey_l,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: type == 'Professional' ? colors.primary : '#e8e8e8',
                            borderWidth: 1
                        }}>
                        <Text>Professional</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%', marginTop: 20}}>
                    <Text>Event place</Text>
                </View>

                <View style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}> 
                    <TouchableOpacity 
                        onPress={() => setPlace('Indoor')}
                        style={{
                            width: '47.5%', 
                            height: '100%', 
                            flexDirection: 'row',
                            backgroundColor: colors.grey_l,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: place == 'Indoor' ? colors.primary : '#e8e8e8',
                            borderWidth: 1
                        }}>
                        <Text>Indoor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setPlace('Outdoor')}
                        style={{
                            width: '47.5%', 
                            height: '100%', 
                            flexDirection: 'row',
                            backgroundColor: colors.grey_l,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: place == 'Outdoor' ? colors.primary : '#e8e8e8',
                            borderWidth: 1
                        }}>
                        <Text>Outdoor</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <CustomInput
                        name="maxGuests"
                        control={control}
                        placeholder="Max guests"
                        rules={{
                            required: 'Required',
                        }}
                        size={12} 
                        color={colors.grey_l} 
                        icon={'people-outline'}
                        keyboardType={'numeric'}
                    />
                </View>

                <View style={{width: '100%', marginTop: 20}}>
                    <Text>Description</Text>
                </View>
            
                <TouchableOpacity 
                    onPress={handleSubmit(onCreateEvent)}
                    style={{ 
                        width: '100%', 
                        height: 50, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: 20,
                        marginBottom: 40,
                        borderRadius: 10,
                        backgroundColor: colors.primary
                    }}>
                    <Text>Create event</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}