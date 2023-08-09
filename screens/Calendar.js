import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, Animated, Alert } from 'react-native';

import { Calendar, LocaleConfig,} from 'react-native-calendars';

import { useTheme } from '../theme/ThemeProvider';

import LottieView from 'lottie-react-native';

import BottomSheet from '../components/BottomSheet';

//Firebase
import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection, where, query } from "firebase/firestore";


const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień'
]


LocaleConfig.locales['pl'] = {
  monthNames: months,
  monthNamesShort: ['St.', 'Lut', 'Mrz', 'Kw', 'Maj', 'Cz', 'Lip', 'Sier', 'Wrz', 'Paź', 'Lis', 'Gr'],
  dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwaterk', 'Piątek', 'Sobota'],
  dayNamesShort: ['Ndz','Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
  today: "Dzisiaj"
};

LocaleConfig.defaultLocale = 'pl';

export default function MainCalendar() {

  const width = Dimensions.get('screen').width;

  const {colors} = useTheme();


  const [ selected, setSelected ] = useState();
  const [ day, setDay ] = useState();

  const [ modalVisible, setModalVisible ] = useState(false);

  const [events, setEvents] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getDayEvents = async (timestamp) => {
    const q = query(collection(db, "users", auth.currentUser.uid, "calendar"), where("startTimestamp", "<=", timestamp));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = {
            ...doc.data(),
            id: doc.id,
        }
        if(data.endTimestamp >= timestamp){
          setEvents(old => [...old, data])
        }
        
    });
    setIsLoading(false);
}


  const onDayClick = (day) => {
    setIsLoading(true);
    setEvents([]);
    setSelected(day.dateString);
    setDay(day);
    getDayEvents(day.timestamp);
  }

  const onTakenClick = (item) => {
    setItem(item);
    setModalVisible(true);
  }

  const confirmTake = () => {

  }

  const Event = ({item}) => {

    const animation = useRef(null);

    return(
      <View style={{
        width: 0.9*width,
        height: 80,
        borderRadius: 15,
        marginLeft: width*0.05,
        backgroundColor: colors.background,
        marginBottom: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2.62,
        elevation: 4,
      }}>
        <View style={{
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10
        }}>
          <Text style={{
            fontSize: 20,
          }}>{item.timeHour + ':' + (item.timeMinutes < 10 ? '0'+item.timeMinutes : item.timeMinutes)}</Text>
        </View>
        <View style={{
          justifyContent:'space-around',
          paddingVertical: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}>{item.title}</Text>
          
          <View style={{
            borderRadius: 5,
            paddingVertical: 5,
            backgroundColor: '#FFE1E1',
            width: 90,
            alignItems: 'center'
          }}>
            <Text style={{
              color: colors.primary,
              fontWeight: 'bold'
            }}>1 tabletka</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => onTakenClick(item)}
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 10,
            right: 10,
            top: 10,
            borderWidth: 1,
            borderColor: colors.grey,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <LottieView
              //autoPlay={item.taken}
              ref={animation}
              style={{
                width: 40,
                height: 40,
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require('../assets/hrURtBKGzl.json')}
              loop={false}
              speed={2}
            />

        </TouchableOpacity>

      </View>
    )
  }


  const [ item, setItem ] = useState();


  useEffect(() => {
    const date = new Date();

    date.setHours(2,0,0,0);

    const actDay = {
      dateString: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      timestamp: date.getTime()
    }

    setDay(actDay);
    getDayEvents(actDay.timestamp)
  }, [])


  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
        <Calendar
          onDayPress={day => {
            onDayClick(day);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: 'black',
            selectedDayTextColor: '#ffffff',
            todayTextColor: colors.primary,
            dayTextColor: '#2d4150',
            textDisabledColor: colors.grey,
            arrowColor: colors.primary,
          }}
          style={{
            width: width
          }}
          enableSwipeMonths={true}
        />

        {day ?
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            padding: 15
          }}>{day.day + ' ' + months[day.month-1]}</Text>
          <Text style={{
            fontSize: 18,
            color: colors.grey_d,
            padding: 15,
            
          }}>1/6</Text>
        </View>
          
        
        : <ActivityIndicator />}

        {!isLoading ? 
          <FlatList style={{
            width: '100%',
          }}
            data={events}
            renderItem={({item}) => <Event item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        
        : <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
            <ActivityIndicator />
          </View>}

        <BottomSheet 
            visible={modalVisible} 
            setModalVisible={setModalVisible}
            text={'Czy wziąłeś'}
            onConfirm={confirmTake}
          >
            <View style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold'
              }}>{item ? item.name : 'None'}</Text>
            </View>
        </BottomSheet>
        
    </SafeAreaView>
  );
}

