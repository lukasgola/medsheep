import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { Calendar, CalendarProvider, LocaleConfig, AgendaList, ExpandableCalendar, Agenda} from 'react-native-calendars';

import { useTheme } from '../theme/ThemeProvider';

import LottieView from 'lottie-react-native';


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


  const events = [
    {
      id: 1,
      hour: 9,
      minutes: 0,
      name: 'Apap',
      taken: true,
    },
    {
      id: 2,
      hour: 14,
      minutes: 0,
      name: 'Rutinoscorbin',
      taken: false,
    },
    {
      id: 3,
      hour: 18,
      minutes: 0,
      name: 'Ibum',
      taken: false,
    },
    {
      id: 4,
      hour: 9,
      minutes: 0,
      name: 'Apap',
      taken: false,
    },
    {
      id: 5,
      hour: 9,
      minutes: 0,
      name: 'Apap',
      taken: false,
    },
    {
      id: 6,
      hour: 9,
      minutes: 0,
      name: 'Apap',
      taken: false,
    },
  ]


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
          }}>{item.hour + ':' + (item.minutes < 10 ? '0'+item.minutes : item.minutes)}</Text>
        </View>
        <View style={{
          justifyContent:'space-around',
          paddingVertical: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}>{item.name}</Text>
          
          <View style={{
            borderRadius: 5,
            paddingVertical: 5,
            backgroundColor: '#fcd2d2',
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
          onPress={() => animation.current.play()}
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
            autoPlay={item.taken}
              ref={animation}
              style={{
                width: 50,
                height: 50,
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require('../assets/ilAE4FTHMK.json')}
              loop={false}
              speed={2}
            />

        </TouchableOpacity>

      </View>
    )
  }

  useEffect(() => {
    const date = new Date();
    console.log(date);
    setDay({
      dateString: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      timestamp: date
    })
  }, [])


  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
        <Calendar
          onDayPress={day => {
            [setSelected(day.dateString), setDay(day), console.log(day)];
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
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            padding: 15
          }}>{day.day + ' ' + months[day.month-1]}</Text>
        
        : <ActivityIndicator />}

        {day ? 
          <FlatList style={{
            width: '100%',
          }}
            data={events}
            renderItem={({item}) => <Event item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        
        : <ActivityIndicator />}

        
    </SafeAreaView>
  );
}

