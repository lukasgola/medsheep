import React, {useState, useEffect, useRef } from 'react';
import {View, KeyboardAvoidingView, Alert, TouchableOpacity, Dimensions, ScrollView, Text, Animated} from 'react-native';

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
        {
            id: 4,
            text: 'Niestandardowe',
        },
    ]

    customFrequencies = [
        {
            id: 1,
            text: 'Dzień'
        },
        {
            id: 2,
            text: 'Tydzień'
        },
        {
            id: 3,
            text: 'Miesiąc'
        },
        {
            id: 4,
            text: 'Rok'
        },
    ]

    const nums = [
        {
            id: 1,
            text: 1
        },
        {
            id: 2,
            text: 2
        },
        {
            id: 3,
            text: 3
        },
        {
            id: 4,
            text: 4
        },
        {
            id: 5,
            text: 5
        },
        {
            id: 6,
            text: 6
        },
        {
            id: 7,
            text: 7
        },
    ]

    const [freq, setFreq] = useState();
    const [freqString, setFreqString] = useState('Częstotliwość')

    const [time, setTime] = useState(new Date(Date.now()))
    const [timeString, setTimeString] = useState('Wybierz godzinę')

    const [ dateStart, setDateStart ] = useState(new Date())
    const [ dateStartString, setDateStartString ] = useState('Początek')

    const [ dateEnd, setDateEnd ] = useState(new Date())
    const [ dateEndString, setDateEndString ] = useState('Koniec')

    const [ customFreq, setCustomFreq ] = useState(1);
    const [ customFreqString, setCustomFreqString ] = useState(1);

    const [ customPeriod, setCustomPeriod ] = useState('Dzień');
    const [ customPeriodString, setCustomPeriodString ] = useState('Dzień');

    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isFreqPickerVisible, setFreqPickerVisible] = useState(false);
    const [isDateStartPickerVisible, setDateStartPickerVisible] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisible] = useState(false);
    const [isCustomFreqPickerVisible, setCustomFreqPickerVisible] = useState(false);
    const [isCustomFreqPeriodPickerVisible, setCustomFreqPeriodPickerVisible] = useState(false);

    const handleFreqConfirm = () => {
        setFreqString(freq);
        if ( freq == 'Niestandardowe' || freqString != 'Niestandardowe'){
            setTimeout(() => {
                springIn();
            }, 1000)
        }
        if( freqString == 'Niestandardowe' || freq != 'Niestandardowe'){
            setTimeout(() => {
                springOut();
            }, 1000)
        }
    }


    const handleCustomFreqConfirm = () => {
        setCustomFreqString(customFreq)
    }

    const handleCustomPeriodConfirm = () => {
        setCustomPeriodString(customPeriod)
    }

    const onChangeTime = (event, value) => {
        setTime(value);
    };

    const onChangeDateStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setDateStart(currentDate);
    };

    const handleDateStartConfirm = () => {
        let month = dateStart.getMonth()+1;
        setDateStartString(dateStart.getDate() + ' / ' + month + ' / ' + dateStart.getFullYear())
    };

    const onChangeDateEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
    };

    const handleDateEndConfirm = () => {
        let month = dateEnd.getMonth()+1;
        setDateEndString(dateEnd.getDate() + ' / ' + month + ' / ' + dateEnd.getFullYear())
    };

    const handleTimeConfirm = () => {
        setTimeString(time.getHours() + ':' + (time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes()))
        console.log(time.getHours() + ':' + time.getMinutes())
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
                }
                addEvent(event);
            }},
        ]);
        
    };

    const springAnim = useRef(new Animated.Value(0)).current;

    const springIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(springAnim, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const springOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.spring(springAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
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
                <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 60, marginBottom: 10}}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: colors.text
                    }}>Dodaj lek do</Text>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: colors.primary
                    }}> kalendarza</Text>
                </View>

                <View style={{width: '100%', alignItems: 'center', marginTop: 10, marginBottom: 30}}>
                    <Text style={{
                        color: colors.grey_d
                    }}>Wypełnij szczegóły</Text>
                </View>

                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <CustomInput
                        name="title"
                        control={control}
                        placeholder="Tytuł"
                        rules={{
                            required: 'Nazwa jest wymagana',
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
                            onPress={() => setFreqPickerVisible(true)}
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
                            
                            <Text style={{
                                color: freqString == 'Częstotliwość' ? colors.grey_d : colors.text,
                                fontSize: 12
                            }}>{freqString}</Text>
                            <BottomSheet 
                                visible={isFreqPickerVisible} 
                                setModalVisible={setFreqPickerVisible}
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
                                    <Ionicons name={'calendar-outline'} size={16} color={colors.grey_d}/>
                            </View>
                            
                            <Text style={{
                                color: timeString == 'Wybierz godzinę' ? colors.grey_d : colors.text,
                                fontSize: 12
                            }}>{timeString}</Text>
                            <BottomSheet 
                                visible={isTimePickerVisible} 
                                setModalVisible={setTimePickerVisible}
                                text={'Podaj począek'}
                                onConfirm={handleTimeConfirm}
                            >
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={time}
                                    mode={'time'}
                                    is24Hour={false}
                                    display="spinner"
                                    onChange={onChangeTime}
                                    textColor={colors.text}
                                />
                            </BottomSheet>
                        </TouchableOpacity>
                    </View>
                
                </View>

                <Animated.View
                    style={{
                        // Bind opacity to animated value
                        height: springAnim,

                    }}>
                    

                    {freqString == 'Niestandardowe' ? 
                    <View>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colors.text,
                        marginTop: 20,
                    }}>Powtarza się co...</Text>
                    <View style={{
                        width: '100%',
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10
                    }}> 
                        <View style={{width: '47.5%', height: '100%'}}>    
                            <TouchableOpacity 
                                onPress={() => setCustomFreqPickerVisible(true)}
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
                                
                                <Text style={{
                                    color: customFreqString == 'Częstotliwość' ? colors.grey_d : colors.text,
                                    fontSize: 12
                                }}>{customFreqString}</Text>
                                <BottomSheet 
                                    visible={isCustomFreqPickerVisible} 
                                    setModalVisible={setCustomFreqPickerVisible}
                                    text={''}
                                    onConfirm={handleCustomFreqConfirm}
                                >
                                    <Picker
                                        selectedValue={customFreq}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setCustomFreq(itemValue)
                                        }>
                                            {nums.map((item) => (
                                                <Picker.Item label={item.text.toString()} value={item.text} key={item.id} />
                                            ))}
                                    </Picker>
                                </BottomSheet>
                            </TouchableOpacity>
                        </View>
    
                        <View style={{width: '47.5%', height: '100%'}}>     
                            <TouchableOpacity 
                                onPress={() => setCustomFreqPeriodPickerVisible(true)}
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
                                
                                <Text style={{
                                    color: customPeriodString == 'W' ? colors.grey_d : colors.text,
                                    fontSize: 12
                                }}>{customPeriodString}</Text>
                                <BottomSheet 
                                    visible={isCustomFreqPeriodPickerVisible} 
                                    setModalVisible={setCustomFreqPeriodPickerVisible}
                                    text={''}
                                    onConfirm={handleCustomPeriodConfirm}
                                >
                                    <Picker
                                        selectedValue={customPeriod}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setCustomPeriod(itemValue)
                                        }>
                                            {customFrequencies.map((item) => (
                                                <Picker.Item label={item.text.toString()} value={item.text} key={item.id} />
                                            ))}
                                    </Picker>
                                </BottomSheet>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                    </View>
                 : 
                 <View></View>
                 }

                
                </Animated.View>

                <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: colors.text,
                    marginTop: 20,
                }}>Czas trwania</Text>

                <View style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}> 
                    <View style={{width: '47.5%', height: '100%'}}>    
                        <TouchableOpacity 
                            onPress={() => setDateStartPickerVisible(true)}
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
                            
                            <Text style={{
                                color: dateStartString == 'Początek' ? colors.grey_d : colors.text,
                                fontSize: 12
                            }}>{dateStartString}</Text>
                            <BottomSheet 
                                visible={isDateStartPickerVisible}
                                setModalVisible={setDateStartPickerVisible}
                                text={'Podaj częstotliwość'}
                                onConfirm={handleDateStartConfirm}
                            >
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateStart}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChangeDateStart}
                                    textColor={colors.text}
                                />
                            </BottomSheet>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: '47.5%', height: '100%'}}>     
                        <TouchableOpacity 
                            onPress={() => setDateEndPickerVisible(true)}
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
                            
                            <Text style={{
                                color: dateEndString == 'Koniec' ? colors.grey_d : colors.text,
                                fontSize: 12
                            }}>{dateEndString}</Text>
                            <BottomSheet 
                                visible={isDateEndPickerVisible} 
                                setModalVisible={setDateEndPickerVisible}
                                text={'Podaj koniec'}
                                onConfirm={handleDateEndConfirm}
                            >
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateStart}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChangeDateEnd}
                                    textColor={colors.text}
                                />
                            </BottomSheet>
                        </TouchableOpacity>
                    </View>
                
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
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.background
                    }}>Dodaj lek</Text>
                </TouchableOpacity>

                <Picker
                    selectedValue={freq}
                    onValueChange={(itemValue, itemIndex) =>
                        setFreq(itemValue)
                    }>
                        {frequencies.map((item) => (
                            <Picker.Item label={item.text.toString()} value={item.text} key={item.id} />
                        ))}
                </Picker>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}