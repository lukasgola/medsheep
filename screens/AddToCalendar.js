import React, {useState, useEffect, useRef } from 'react';
import {View, KeyboardAvoidingView, Alert, TouchableOpacity, Dimensions, ScrollView, Text, Animated, TextInput, Platform} from 'react-native';

//Hooks
import { useTheme } from '../theme/ThemeProvider';
import { useData } from '../providers/DataProvider';

import { useIsFocused } from '@react-navigation/native';

import { removeEvent } from '../firebase/firebase-config';

import BottomSheet from '../components/BottomSheet';


import DateTimePicker from '@react-native-community/datetimepicker';

import {Picker} from '@react-native-picker/picker';

//Firebase
import { addToCalendar, setDates, getNotID } from '../firebase/firebase-config';

import Ionicons from 'react-native-vector-icons/Ionicons';


// Expo
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function scheduleNotification(date, title, body) {
    
    console.log("Not date: " + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + "   " + date.getHours() + ":" + date.getMinutes())

    const notID = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            sound: 'default',
        },
        trigger: {
            hour: date.getHours(),
            minute: date.getMinutes(),
            day: date.getDate(),
            month: date.getMonth()+1,
            year: date.getFullYear(),
            repeats: false, 
        },
    });

    return notID
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token?.data;
}


export default function AddToCalendar({route, navigation, item}){

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const {data, setData} = useData();

    const isFocused = useIsFocused();

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

    const doses = [
        {
            id: 1,
            text: 'tabletka',
        },
        {
            id: 2,
            text: 'łyzeczka',
        },
        {
            id: 3,
            text: 'saszetka',
        },
        {
            id: 4,
            text: 'ampułka',
        },
        {
            id: 5,
            text: 'porcja'
        },
        {
            id: 6,
            text: 'ml'
        }
    ]

    const [ title, setTitle ] = useState('');
    
    const [ medString, setMedString ] = useState('Wybierz')

    const [ freq, setFreq ] = useState(0);
    const [ freqString, setFreqString ] = useState('Codziennie')
    const [ prevFreq, setPrevFreq ] = useState('');
    const [ prevFreqString, setPrevFreqString ] = useState(freqString)

    const [doseArray, setDoseArray] = useState([])

    const [ dose, setDose ] = useState(1);
    const [ prevDose, setPrevDose] = useState(1)

    const [ doseUnit, setDoseUnit ] = useState('tabletka')
    const [ prevDoseUnit, setPrevDoseUnit] = useState('')
    const [ doseUnitString, setDoseUnitString] = useState('tabletka')

    const [ time, setTime ] = useState(new Date(Date.now()))

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
    const [isDosePickerVisible, setDosePickerVisible] = useState(false);

    const [ isTimePickerVisible ,setTimePickerVisible ] = useState(Platform.OS == 'android' ? false : true)


    const fontSize = 14;



    {/* Push Notifications */}

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);



    useEffect(() => {
        if(data.id){
            console.log("Nowe idd: " + data.id)
            setMedString(data.product.name)
        }
        
    }, [isFocused])

    useEffect(() => {
        for(let i = 1; i < 5; i++){
            setDoseArray(oldArray => [...oldArray, i]);
        }
    }, [])

    useEffect(() => {
        if(data.event){
            //console.log(data.event)
            setMedString(data.event.title)
            
            setDose(data.event.dose)
            setDoseUnit(data.event.doseUnit)
            setDoseUnitString(data.event.doseUnit)

            setFreq(data.event.freq)
            setFreqString(frequencies[data.event.freq].text)
            
            setTitle(data.event.title)

            const dateS = new Date(data.event.startTimestamp)
            const dateE = new Date(data.event.endTimestamp)

            setDateStart(dateS)
            setDateEnd(dateE)

            setDateStartString(formatDate(dateS))
            setDateEndString(formatDate(dateE))

            setCustomFreq(data.event.customFreq)
            setCustomFreqString(data.event.customFreqString)

            setCustomPeriod(data.event.customPeriod)
            setCustomPeriodString(data.event.customPeriodString)

            const refTime = new Date(Date.now())
            refTime.setHours(data.event.timeHour)
            refTime.setMinutes(data.event.timeMinutes)

            console.log(refTime)

            setTime(refTime)
            
        }
    }, [])


    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        return `${day} / ${month} / ${year}`;
    };


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => data.id ? onCreateEvent() : emptyData()}
                    title="Info"
                    color="#fff"
                >
                    <Text style={{
                    color: colors.primary,
                    fontSize: 18,
                    fontWeight: 'bold'
                    }}>{data.event ? 'Edytuj' : 'Dodaj'}</Text>
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
    }, [title, time, freq, dateStart, dateEnd, dose, doseUnit, customFreq, navigation, data]);

    const emptyData = () => {
        Alert.alert('Nie wybrano leku', 'Wybierz lek', [
        {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
        }])
    }

    const handleFreqConfirm = () => {
        setFreq(prevFreq)
        setFreqString(prevFreqString)

        if(prevFreq == 'Niestandardowe'){
            springIn()
        }
        if(prevFreq != 'Niestandardowe' && springAnim !== 0 ){
            springOut()
        }
    }

    const handleDoseConfirm = () => {
        console.log("PrevDose: " + prevDose)
        console.log("PrevUnit: " + prevDoseUnit)
        setDose(prevDose)
        setDoseUnit(prevDoseUnit)
        setDoseUnitString(prevDoseUnit)
    }


    const handleCustomFreqConfirm = () => {
        setCustomFreqString(customFreq)
    }

    const handleCustomPeriodConfirm = () => {
        setCustomPeriodString(customPeriod)
    }

    const onChangeTime = (event, value) => {
        setTime(value);
        if(Platform.OS == 'android'){
            setTimePickerVisible(false)
        }
    };

    const getTimeString = (date) => {
        if (!(date instanceof Date)) {
            throw new TypeError("The argument must be a Date object");
        }
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const onChangeDateStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setDateStart(currentDate);
        if(Platform.OS == 'android') {
            handleDateStartConfirmAndroid(currentDate)
            setDateStartPickerVisible(false)
        }
    };

    const handleDateStartConfirmAndroid = (dateStart) => {
        let month = dateStart.getMonth()+1;
        setDateStartString(dateStart.getDate() + ' / ' + month + ' / ' + dateStart.getFullYear())
        if(dateStart > dateEnd){
            setDateEnd(dateStart)
            setDateEndString(dateStart.getDate() + ' / ' + month + ' / ' + dateStart.getFullYear())
        }
    };

    const handleDateStartConfirm = () => {
        let month = dateStart.getMonth()+1;
        setDateStartString(dateStart.getDate() + ' / ' + month + ' / ' + dateStart.getFullYear())
        if(dateStart > dateEnd){
            setDateEnd(dateStart)
            setDateEndString(dateStart.getDate() + ' / ' + month + ' / ' + dateStart.getFullYear())
        }

    };

    const onChangeDateEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
        if(Platform.OS == 'android') {
            handleDateEndConfirmAndroid(currentDate)
            setDateEndPickerVisible(false)
        }
    };

    const handleDateEndConfirm = () => {
        let month = dateEnd.getMonth()+1;
        setDateEndString(dateEnd.getDate() + ' / ' + month + ' / ' + dateEnd.getFullYear())
    };

    const handleDateEndConfirmAndroid = (dateEnd) => {
        let month = dateEnd.getMonth()+1;
        setDateEndString(dateEnd.getDate() + ' / ' + month + ' / ' + dateEnd.getFullYear())
    };
    

    const confirmDelete = async (item) => {
        notArray = await getNotID(item.id);

        for (const notification of notArray) {
            await Notifications.cancelScheduledNotificationAsync(notification);
        }

        await removeEvent(item.id)

    }


    const onCreateEvent = () => {
        console.log('Id: ' + data.id)
        console.log("Freq: " + freq)

        if(data.event){
            console.log("event id: " + data.event.id)
        }
        

        Alert.alert('Nowe przypomnienie', 'Na pewno chcesz dodać przypomnienie?', [
        {
            text: 'Anuluj',
            onPress: () => {},
            style: 'cancel',
        },
        {
            text: 'Dodaj',
            onPress: async () => {

                if(data.event){
                    confirmDelete(data.event);
                }
                
                const dateS = dateStart;
                const dateE = dateEnd;

                dateS.setHours(2,0,0,0)
                dateE.setHours(2,0,0,0)

                const takenArray = [];

                for(var i=dateS.getTime(); i <= dateE.getTime(); i+=((freq+1) * 86400000)){
                    {/* Schedule notification */}

                    const date = new Date(i);
                    date.setHours(time.getHours())
                    date.setMinutes(time.getMinutes());

                    console.log(date)

                    const notID = await scheduleNotification(date, title == '' ? medString : title, 'Pora wziąc lek! 💊')
                    
                    
                    takenArray.push({
                        id: i,
                        taken: false,
                        notID: notID
                    })


                }

                const event = {
                    title: title == '' ? medString : title,
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
                    itemId: data.id ? data.id : null,
                    dose: dose,
                    doseUnit: doseUnitString,
                }
                addToCalendar(event, takenArray);
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
                style={{
                    width: width*0.9,
                }}
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


                {Platform.OS == 'android' &&
                
                <TouchableOpacity 
                    onPress={() => setTimePickerVisible(true) }
                    style={{
                        width: '100%', 
                        height: 50, 
                        flexDirection: 'row',
                        backgroundColor: colors.grey_l,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: '#e8e8e8',
                        borderWidth: 1,
                        
                }}>
                    <View
                        style={{
                            width: 40,
                            paddingLeft: 10,
                            justifyContent: 'center',
                        }}
                        >
                            <Ionicons name={'time-outline'} size={20} color={colors.grey_d}/>
                    </View>

                    <Text style={{
                        color: colors.text,
                        fontSize: fontSize,
                    }}>Godzina</Text>

                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: colors.grey_d,
                            fontSize: fontSize
                        }}>{getTimeString(time)}</Text>

                        <Ionicons name={'chevron-forward-outline'} size={20} color={colors.grey_d}/>

                    </View>
                    
                </TouchableOpacity>
                
                }

            
                
                {isTimePickerVisible &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode={'time'}
                        display={Platform.OS == 'ios' ? "spinner" : 'default'}
                        onChange={onChangeTime}
                        textColor={colors.text}
                        minuteInterval={1}
                        accentColor={colors.primary}
                        locale='es-ES'
                    />
                }

                <TouchableOpacity 
                    onPress={() => navigation.navigate('Apteczka', {chooseMode: true})}
                    style={{
                        width: '100%', 
                        height: 50, 
                        flexDirection: 'row',
                        backgroundColor: colors.grey_l,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: '#e8e8e8',
                        borderWidth: 1,
                        
                }}>
                    <View
                        style={{
                            width: 40,
                            paddingLeft: 10,
                            justifyContent: 'center',
                        }}
                        >
                            <Ionicons name={'medkit-outline'} size={20} color={colors.grey_d}/>
                    </View>

                    <Text style={{
                        color: colors.text,
                        fontSize: fontSize,
                    }}>Lek</Text>

                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: colors.grey_d,
                            fontSize: fontSize
                        }}>{medString}</Text>

                        <Ionicons name={'chevron-forward-outline'} size={20} color={colors.grey_d}/>

                    </View>
                    
                </TouchableOpacity>

                {/* Dawka */}

                <TouchableOpacity 
                    onPress={() => {
                        setDosePickerVisible(true)
                        setPrevDose(dose)
                        setPrevDoseUnit(doseUnit)
                    }}
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
                            justifyContent: 'center',
                        }}
                        >
                            <Ionicons name={'refresh-outline'} size={20} color={colors.grey_d}/>
                    </View>

                    <Text style={{
                        color: colors.text,
                        fontSize: fontSize,
                    }}>Dawka</Text>

                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: colors.grey_d,
                            fontSize: fontSize
                        }}>{ dose + ' ' + doseUnitString}</Text>

                        <Ionicons name={'chevron-forward-outline'} size={20} color={colors.grey_d}/>

                    </View>

                    <BottomSheet 
                        visible={isDosePickerVisible} 
                        setModalVisible={setDosePickerVisible}
                        text={'Podaj dawkę'}
                        onConfirm={handleDoseConfirm}
                    >
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                width: '50%'
                            }}>
                            <Picker
                                selectedValue={prevDose}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setPrevDose(itemValue)
                                }
                                }>
                                    {doseArray.map((item) => (
                                        <Picker.Item label={item.toString()} value={item} key={item} />
                                    ))}
                            </Picker>
                            </View>
                            <View style={{
                                width: '50%'
                            }}>
                            <Picker
                                selectedValue={prevDoseUnit}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setPrevDoseUnit(itemValue)
                                }
                                }>
                                    {doses.map((item) => (
                                        <Picker.Item label={item.text.toString()} value={item.text} key={item.id} />
                                    ))}
                            </Picker>
                            </View>
                        </View>
                        
                    </BottomSheet>
                </TouchableOpacity>


                <TouchableOpacity 
                    onPress={() => {
                        setFreqPickerVisible(true)
                        setPrevFreq(freq)
                    }}
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
                            selectedValue={prevFreqString}
                            onValueChange={(itemValue, itemIndex) =>{
                                setPrevFreq(itemIndex)
                                setPrevFreqString(itemValue)
                            }
                            }>
                                {frequencies.map((item) => (
                                    <Picker.Item label={item.text.toString()} value={item.text} key={item.id} />
                                ))}
                        </Picker>
                    </BottomSheet>
                </TouchableOpacity>

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
                        marginTop: 5,
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

                <View
                    style={{
                    width: '100%',
                    height: 50,
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

                    {Platform.OS == 'ios' &&
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
                                display={Platform.OS == 'ios' ? "spinner" : 'calendar'}
                                onChange={onChangeDateStart}
                                textColor={colors.text}
                                minimumDate={time}
                            />
                        </BottomSheet>
                    }
                    {Platform.OS == 'android' && isDateStartPickerVisible &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateStart}
                            mode={'date'}
                            is24Hour={true}
                            display={Platform.OS == 'ios' ? "spinner" : 'calendar'}
                            onChange={onChangeDateStart}
                            textColor={colors.text}
                            minimumDate={time}
                        />
                    }

                    
                </TouchableOpacity>
  
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
                        borderTopWidth: 0,
                        marginBottom: 50
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

                    {Platform.OS == 'ios' &&
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
                            display={Platform.OS == 'ios' ? "spinner" : 'calendar'}
                            onChange={onChangeDateEnd}
                            textColor={colors.text}
                            minimumDate={dateStart}
                        />
                    </BottomSheet>
                    }  
                    {Platform.OS == 'android' && isDateEndPickerVisible &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateEnd}
                            mode={'date'}
                            is24Hour={true}
                            display={Platform.OS == 'ios' ? "spinner" : 'calendar'}
                            onChange={onChangeDateEnd}
                            textColor={colors.text}
                            minimumDate={dateStart}
                        />
                    }
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}