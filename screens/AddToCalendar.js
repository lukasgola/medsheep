import React, {useState, useEffect, useRef } from 'react';
import {View, KeyboardAvoidingView, Alert, TouchableOpacity, Dimensions, ScrollView, Text, Animated, TextInput} from 'react-native';

//Hooks
import {useTheme} from '../theme/ThemeProvider';

import BottomSheet from '../components/BottomSheet';


import DateTimePicker from '@react-native-community/datetimepicker';

import {Picker} from '@react-native-picker/picker';

//Firebase
import { addToCalendar } from '../firebase/firebase-config';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default function AddToCalendar({navigation}){

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

    const [ title, setTitle ] = useState('');

    const [freq, setFreq] = useState(1);
    const [freqString, setFreqString] = useState('Codziennie')

    const [time, setTime] = useState(new Date(Date.now()))

    const [ dateStart, setDateStart ] = useState(new Date())
    const [ dateStartString, setDateStartString ] = useState(new Date().getDate() + ' / ' + (new Date().getMonth()+1) + ' / ' + new Date().getFullYear())

    const [ dateEnd, setDateEnd ] = useState(new Date())
    const [ dateEndString, setDateEndString ] = useState(new Date().getDate() + ' / ' + (new Date().getMonth()+1) + ' / ' + new Date().getFullYear())

    const [ customFreq, setCustomFreq ] = useState(1);
    const [ customFreqString, setCustomFreqString ] = useState(1);

    const [ customPeriod, setCustomPeriod ] = useState('Dzień');
    const [ customPeriodString, setCustomPeriodString ] = useState('Dzień');

    const [isFreqPickerVisible, setFreqPickerVisible] = useState(false);
    const [isDateStartPickerVisible, setDateStartPickerVisible] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisible] = useState(false);
    const [isCustomFreqPickerVisible, setCustomFreqPickerVisible] = useState(false);
    const [isCustomFreqPeriodPickerVisible, setCustomFreqPeriodPickerVisible] = useState(false);


    const fontSize = 14;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => onCreateEvent()}
                    title="Info"
                    color="#fff"
                >
                    <Text style={{
                    color: colors.primary,
                    fontSize: 18,
                    fontWeight: 'bold'
                    }}>Dodaj</Text>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  title="Info"
                  color="#fff"
                >
                  <Text style={{
                    color: colors.primary,
                    fontSize: 18,
                  }}>Anuluj</Text>
                </TouchableOpacity>
              )
        });
    }, [title, time, freq, dateStart, dateEnd, customFreq, navigation]);

    const handleFreqConfirm = () => {
        setFreqString(freq);
        if ( freq == 'Niestandardowe' && freqString != 'Niestandardowe'){
            setTimeout(() => {
                springIn();
            }, 1000)
        }
        if( freqString == 'Niestandardowe' && freq != 'Niestandardowe'){
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


    const onCreateEvent = () => {
        console.log('time: ' + time.getHours())
        Alert.alert('New Event', 'Do you want to public this event?', [
        {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
        },
        {
            text: 'Yes',
            onPress: () => {
                
                const dateS = dateStart;
                const dateE = dateEnd;

                dateS.setHours(2,0,0,0);
                dateE.setHours(2,0,0,0);

                const takenArray = [];

                for(var i=dateS.getTime(); i <= dateE.getTime(); i+=86400000){
                    takenArray.push({
                        id: i,
                        taken: false
                    })
                }

                const event = {
                    title: title,
                    freq: freq,
                    dateStart: dateS,
                    dateEnd: dateE,
                    dayStart: dateStart.getDate(),
                    monthStart: dateStart.getMonth()+1,
                    yearStart: dateStart.getFullYear(),
                    dayEnd: dateEnd.getDate(),
                    monthEnd: dateEnd.getMonth()+1,
                    yearEnd: dateEnd.getFullYear(),
                    timeHour: time.getHours(),
                    timeMinutes: time.getMinutes(),
                    dateStartString: dateStart.getFullYear() + '-' + (dateStart.getMonth() < 10 ? '0' + (dateStart.getMonth()+1) : (dateStart.getMonth()+1)) + '-' + (dateStart.getDate() < 10 ? '0' + dateStart.getDate() : dateStart.getDate()),
                    dateEndString: dateEnd.getFullYear() + '-' + (dateEnd.getMonth() < 10 ? '0' + (dateEnd.getMonth()+1) : (dateEnd.getMonth()+1)) + '-' + (dateEnd.getDate() < 10 ? '0' + dateEnd.getDate() : dateEnd.getDate()),
                    startTimestamp: dateS.getTime(),
                    endTimestamp: dateE.getTime(),
                }
                addToCalendar(event);
                navigation.navigate('Kalendarz');
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
            behavior= {Platform.OS == "ios" ? "position" : "height"}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
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

                <View style={{width: '100%', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                    <Text style={{
                        color: colors.grey_d
                    }}>Wypełnij szczegóły</Text>
                </View>

                
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Apteczka')}
                    style={{
                        width: '100%', 
                        height: 50, 
                        marginTop: 10,
                        flexDirection: 'row',
                        backgroundColor: colors.grey_l,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: '#e8e8e8',
                        borderWidth: 1
                }}>

                </TouchableOpacity>
                

                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode={'time'}
                    is24Hour={false}
                    display="spinner"
                    onChange={onChangeTime}
                    textColor={colors.text}
                    minuteInterval={15}
                />

                <View style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}> 
                    <View style={{width: '100%', height: '100%'}}>    
                        <TouchableOpacity 
                            onPress={() => setFreqPickerVisible(true)}
                            style={{
                                width: '100%', 
                                height: '100%', 
                                flexDirection: 'row',
                                backgroundColor: colors.grey_l,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor: '#e8e8e8',
                                borderWidth: 1
                            }}>
                            <View
                                style={{
                                    width: 40,
                                    paddingLeft: 10,
                                    justifyContent: 'center',
                                }}
                                >
                                    <Ionicons name={'refresh-outline'} size={20} color={colors.grey_d}/>
                            </View>

                            <Text style={{
                                color: colors.text,
                                fontSize: fontSize,
                            }}>Powtarzaj</Text>

                            <View style={{
                                flexDirection: 'row',
                                position: 'absolute',
                                right: 10,
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: colors.grey_d,
                                    fontSize: fontSize
                                }}>{freqString}</Text>

                                <Ionicons name={'chevron-forward-outline'} size={20} color={colors.grey_d}/>

                            </View>

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
                
                </View>

                <Animated.View
                    style={{
                        // Bind opacity to animated value
                        height: springAnim,

                    }}>
                    

                    {freqString == 'Niestandardowe' ? 
                    <View>
                    <Text style={{
                        fontSize: fontSize,
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
                                    fontSize: fontSize
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
                                    fontSize: fontSize
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

                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
                    <View
                        style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: colors.grey_l,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: '#e8e8e8',
                        borderWidth: 1,
                        borderTopWidth: 0
                        }}
                    >
                        <View
                        style={{
                            width: 40,
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}
                        >
                            <Ionicons name={'code-working-outline'} size={20} color={colors.grey_d}/>
                        </View>

                        <Text style={{
                            position: 'absolute',
                            left: 40
                        }}>Etykieta</Text>

                        <TextInput
                            style={{
                                width: '90%',
                                height: '100%',
                                fontSize: fontSize,
                                color: colors.grey_d,
                                paddingRight: 20
                            }}
                            value={title}
                            onChangeText={setTitle}
                            //onBlur={onBlur}
                            placeholder={'Lek'}
                            placeholderTextColor={colors.grey_d}
                            selectionColor={colors.primary}
                            textAlign='right'
                        />
                    </View>
                </View>

                <View style={{width: '100%', height: 50}}>  
                    <TouchableOpacity 
                        onPress={() => setDateStartPickerVisible(true)}
                        style={{
                            width: '100%', 
                            height: 50, 
                            flexDirection: 'row',
                            backgroundColor: colors.grey_l,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#e8e8e8',
                            borderWidth: 1,
                            borderTopWidth: 0
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
                            color: colors.text,
                            fontSize: fontSize
                        }}>Początek</Text>

                        <View style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            right: 10,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: colors.grey_d,
                                fontSize: fontSize
                            }}>{dateStartString}</Text>
                            <Ionicons name={'chevron-forward-outline'} size={20} color={colors.grey_d}/>

                        </View>

                        <BottomSheet 
                            visible={isDateStartPickerVisible}
                            setModalVisible={setDateStartPickerVisible}
                            text={'Podaj początek'}
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

                <View style={{width: '100%', height: 50}}>    
                    <TouchableOpacity 
                        onPress={() => setDateEndPickerVisible(true)}
                        style={{
                            width: '100%', 
                            height: 50, 
                            flexDirection: 'row',
                            backgroundColor: colors.grey_l,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#e8e8e8',
                            borderWidth: 1,
                            borderTopWidth: 0
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
                            color: colors.text,
                            fontSize: fontSize
                        }}>Koniec</Text>

                        <View style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            right: 10,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: colors.grey_d,
                                fontSize: fontSize
                            }}>{dateEndString}</Text>
                            <Ionicons name={'chevron-forward-outline'} size={20} color={colors.grey_d}/>

                        </View>
                        <BottomSheet 
                            visible={isDateEndPickerVisible} 
                            setModalVisible={setDateEndPickerVisible}
                            text={'Podaj koniec'}
                            onConfirm={handleDateEndConfirm}
                        >
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateEnd}
                                mode={'date'}
                                is24Hour={true}
                                display="spinner"
                                onChange={onChangeDateEnd}
                                textColor={colors.text}
                            />
                        </BottomSheet>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}