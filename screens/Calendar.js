import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { Calendar, CalendarProvider, LocaleConfig, AgendaList, ExpandableCalendar, Agenda} from 'react-native-calendars';

import { useTheme } from '../theme/ThemeProvider';


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
      name: 'Apap'
    },
    {
      id: 2,
      hour: 9,
      minutes: 0,
      name: 'Apap'
    },
    {
      id: 3,
      hour: 9,
      minutes: 0,
      name: 'Apap'
    },
    {
      id: 4,
      hour: 9,
      minutes: 0,
      name: 'Apap'
    },
  ]


  const Event = ({item}) => {
    return(
      <View style={{
        width: 0.9*width,
        height: 80,
        borderRadius: 20,
        marginLeft: width*0.05,
        backgroundColor: colors.background,
        marginTop: 10,
        flexDirection: 'row',
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
            fontWeight: 'bold'
          }}>{item.hour + ':' + (item.minutes < 10 ? '0'+item.minutes : item.minutes)}</Text>
        </View>

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
      alignItems: 'center',
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
        <View style={{
          width: '100%',
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            padding: 20
          }}>{day.day + ' ' + months[day.month-1]}</Text>
          <FlatList style={{
            width: '100%',
            height: 300
          }}
            data={events}
            renderItem={({item}) => <Event item={item} />}
            keyExtractor={item => item.id}
          />
            
        </View>
        
        : <ActivityIndicator />}
        
    </SafeAreaView>
  );
}

