import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native';

//Ionicons
import Ionicons from 'react-native-vector-icons/Ionicons';

//Calendars
import { Calendar, LocaleConfig,} from 'react-native-calendars';

//Providers
import { useTheme } from '../theme/ThemeProvider';

//Hooks
import { useIsFocused } from "@react-navigation/native";

//Components
import BottomSheet from '../components/BottomSheet';
import Swipe from '../components/Swipe';
import CartItem from '../components/CartItem';


//Firebase
import { auth, db, getKitItem, getNotID, removeEvent, setTaken } from '../firebase/firebase-config';
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

  await Notifications.scheduleNotificationAsync({
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



export default function MainCalendar() {

  const width = Dimensions.get('screen').width;
  const {colors} = useTheme();
  const isFocused = useIsFocused();

  const [ selected, setSelected ] = useState();
  const [ day, setDay ] = useState();
  const [ events, setEvents ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ item, setItem ] = useState();
  const [ takenAmount, setTakenAmount ] = useState(0);

  const [kitItem, setKitItem] = useState();

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ modalVisible2, setModalVisible2 ] = useState(false);
  const [ modalVisible3, setModalVisible3 ] = useState(false);

  const ref = useRef(null);


  const actDate = new Date()


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



  const getTakenArray = async (id, timestamp) => {
    let takenItem = 0;
    const q2 = query(collection(db, "users", auth.currentUser.uid, "events", id, "calendar" ), where("id", "==", timestamp));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      //const kitItem = getKitItem(data.itemId);
        const item = {
          ...doc.data(),
          id: doc.id,
          //kitItem: kitItem
        }
      takenItem = item.taken;
    });
    return takenItem;
  }

  async function fetchDataWithKitItems(querySnapshot) {
    const fetchedData = [];
  
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const kitItem = await getKitItem(data.itemId); // Await the async function
      const item = {
        ...data,
        id: doc.id,
        kitItem: kitItem,
        taken: false // Add the taken field with the default value of false
      };
      fetchedData.push(item); // Add the transformed item to the fetchedData array
    }
  
    return fetchedData;
  }

  const getDayEvents = async (timestamp) => {
    const q = query(collection(db, "users", auth.currentUser.uid, "events"), where("endTimestamp", ">=", timestamp));
    const querySnapshot = await getDocs(q);
    const fetchedData = await fetchDataWithKitItems(querySnapshot);
    const filtered = fetchedData.filter((item) => item.startTimestamp <= timestamp);
    const updatedArray = [...filtered];
  
    for (let index = 0; index < updatedArray.length; index++) {
      const item = updatedArray[index];
      const value = await getTakenArray(item.id, timestamp);
      updatedArray[index].taken = value;
      if(value === 0){
        updatedArray.splice(index, 1);
        index--;
      }
    }

    updatedArray.sort((a, b) => (a.timeHour < b.timeHour) ? -1 : (a.timeHour > b.timeHour) ? 1 : ((a.timeHour == b.timeHour) && (a.timeMinutes < b.timeMinutes) ? -1 : 0));

    setEvents(updatedArray);

    let amount = 0;
    for( let i = 0; i<filtered.length;i++){
      if(filtered[i].taken == true){
        amount = amount + 1;
      }

    }
    setTakenAmount(amount);
    setIsLoading(false);
  }

  const updateItemValue = (itemId, newValue) => {
    const updatedItems = events.map(item => {
      if (item.id === itemId) {
        return { ...item, taken: newValue };
      }
      return item;
    });
    setEvents(updatedItems);
  };


  const onDayClick = (day) => {
    setIsLoading(true);
    setSelected(day.dateString);
    setDay(day);
    getDayEvents(day.timestamp);
  }

  const onTakenClick = async (item) => {
    setItem(item);
    setKitItem(item.kitItem);
    setModalVisible(true);
  }

  const confirmTake = () => {
    updateItemValue(item.id, true);
    setTaken(item.id, day.timestamp, item.itemId);
    setTakenAmount(takenAmount + 1);
  }

  const confirmDelete = async () => {
    notArray = await getNotID(item.id);

    for (const notification of notArray) {
      await Notifications.cancelScheduledNotificationAsync(notification);
    }

    await removeEvent(item.id)

  }


  const onDelay = async (delay) => {
    let date = new Date();  // Get the current date and time
    console.log("Original date and time:", date);

    date.setMinutes(date.getMinutes() + delay);  // Add the specified delay to the current date and time
    console.log("Updated date and time:", date);

    const title = title === '' ? medString : title;  // Determine the title
    scheduleNotification(date, title, 'Pora wziąc lek! 💊');  // Schedule the notification
    setModalVisible(false)
  }


  //Swipe
  let row = [];
  let prevOpenedRow;

  const onSettingsClick = ({item, index}) => {
    setItem(item);
    setModalVisible2(true);
  }

  const onDeleteClick = ({item, index}) => {
    setItem(item);
    setModalVisible3(true);
  }

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const Event = ({item, index}) => {

    return(
      <Swipe 
        index={index}
        closeRow={() => closeRow(index)}
        row={row}
        settingsClick={() => onSettingsClick({item, index})}
        trashClick={() => onDeleteClick({item, index})}

        style={{
          width: '90%',
          height: 80,
          backgroundColor: colors.background,
          alignItems: 'center',
          borderRadius: 10,
          marginLeft: '5%',
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
          }}>{item.timeHour + ':' + (item.timeMinutes < 10 ? '0'+item.timeMinutes : item.timeMinutes)}</Text>
        </View>
        <View style={{
          height: '100%',
          justifyContent:'space-around',
          paddingVertical: 10,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}>{item.title}</Text>
          
          <View style={{
            borderRadius: 5,
            paddingVertical: 5,
            backgroundColor: '#FFE1E1',
            alignItems: 'center',
            paddingHorizontal: 10
          }}>
            <Text style={{
              color: colors.primary,
              fontWeight: 'bold'
            }}>{item.dose + ' ' + item.doseUnit} </Text>
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
          }}
            disabled={item.taken}
          >
            {item.taken && 
            <Ionicons name={'checkmark-circle-outline'} style={{marginLeft: 4}} size={40} color={colors.primary} />
            }
            {item.taken == false && (day.timestamp + 86400000 ) < actDate.getTime() && 
              <Text>P</Text>
            }
        </TouchableOpacity>

      </Swipe>
    )
  }

  useEffect(() => {
    const date = new Date();

    date.setHours(2,0,0,0);

    const actDay = {
      dateString: date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      timestamp: date.getTime()
    }

    setDay(actDay);
    setSelected(actDay.dateString);
    getDayEvents(actDay.timestamp);
  }, [isFocused, modalVisible3])

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
            
          }}>{takenAmount}/{events.length}</Text>
        </View>
          
        
        : <ActivityIndicator />}

        {!isLoading ? 
          <FlatList style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.grey_l
          }}
            data={events}
            ref={ref}
            renderItem={({item, index}) => <Event item={item} index={index} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: 80, // Height of each item
              offset: 50 * index,
              index,
            })}
            ListEmptyComponent={
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                marginTop: 100,
              }}>
                <Text style={{
                  color: colors.grey_d
                }}>Nie ma żadnych leków</Text>
              </View>
            }
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
              width: '100%',
              paddingHorizontal: '2.5%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '700',
                width: '50%'
              }}>{item?.title}</Text>
              <View style={{
                width: '50%',
                borderRadius: 5,
                paddingVertical: 5,
                backgroundColor: '#FFE1E1',
                alignItems: 'center',
                paddingHorizontal: 10
              }}>
                <Text style={{
                  color: colors.primary,
                  fontWeight: 'bold'
                }}>{item?.dose + ' ' + item?.doseUnit} </Text>
              </View>
            </View>
            <Text style={{
              paddingHorizontal: '2.5%',
            }}>{kitItem?.pillNumber} tab.</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: colors.grey_d,
              marginTop: 20,
              marginLeft: '2.5%'
            }}>Odłóz</Text>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10
            }}>
              <TouchableOpacity 
                onPress={() => onDelay(30)}
                activeOpacity={0.2}
                style={{
                    width: '48%',
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.grey_l,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.grey
              }}>
                  <Text style={{
                      fontSize: 16,
                      color: colors.text
                  }}>+30 min</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => onDelay(60)}
                activeOpacity={0.2}
                style={{
                    width: '48%',
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.grey_l,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.grey
              }}>
                  <Text style={{
                      fontSize: 16,
                      color: colors.text
                  }}>+1 godz</Text>
              </TouchableOpacity>
            </View>
            
        </BottomSheet>


        <BottomSheet 
            visible={modalVisible3} 
            setModalVisible={setModalVisible3}
            text={'Czy na pewno chcesz usunąć?'}
            onConfirm={confirmDelete}
          >
              <View style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>{item ? item.title : 'None'}</Text>
              </View>
        </BottomSheet>
        
    </SafeAreaView>
  );
}

