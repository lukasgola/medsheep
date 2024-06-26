import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';
import { useCurrentUser } from '../providers/CurrentUserProvider';
import { useKit } from '../providers/KitProvider';
import { useBasket } from '../providers/BasketProvider';

import CartItem from '../components/CartItem';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';


//Firebase
import { auth } from '../firebase/firebase-config';


export default function Patient({navigation}) {

  const { colors } = useTheme();
  const { currentUser } = useCurrentUser();
  const { kit } = useKit();
  const { basket } = useBasket();

  const [ cumulation, setCumulation ] = useState(0);

  const actDate = new Date()
  const [ date, setDate ] = useState(actDate);
  const [ dateString, setDateString ] = useState('')

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  useEffect(() => {
    if (currentUser.birthdate !== null){
      const d = new Date(currentUser.birthdate)
      setDate(d)
      setDateString(formatDate(d))
    }
  }, [currentUser])


  return (
    <ScrollView style={{
      flex: 1,
      paddingHorizontal: '5%'
    }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dane osobiste')}
          style={[styles2.block,{
            backgroundColor: colors.background,
            flexDirection: 'row',
            padding: 15,
            alignItems: 'center',
            borderColor: colors.grey
          }]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Avatar')}
          >
            <Image 
              source={{uri: currentUser.avatar}} 
              resizeMode='contain'
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
          
          <View>
            <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>{currentUser.name} {currentUser.lastName}</Text>
            <View style={{flexDirection: 'row', marginLeft: 20,}}>
              <Ionicons name={'calendar-outline'} size={16} color={colors.text} style={{marginTop: 4}} />
              <Text style={{
                fontSize: 14,
                color: colors.grey_d,
                marginLeft: 10,
                marginTop: 5
              }}>{ currentUser.birthdate == null ? 'Data urodzenia' : dateString}</Text>
            </View>
            
            <View style={{flexDirection: 'row', marginLeft: 20,}}>
              <Ionicons name={'man-outline'} size={16} color={colors.text} style={{marginTop: 4}} />
              <Text style={{
                fontSize: 14,
                color: colors.grey_d,
                marginLeft: 10,
                marginTop: 5
              }}>{currentUser.height == null ? 'Wzrost' : currentUser.height + ' cm'} </Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20,}}>
              <Ionicons name={'barbell-outline'} size={16} color={colors.text} style={{marginTop: 4}} />
              <Text style={{
                fontSize: 14,
                color: colors.grey_d,
                marginLeft: 10,
                marginTop: 5
              }}>{currentUser.weight == null ? 'Waga' : currentUser.weight + ' kg'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20,}}>
              <Ionicons name={'water-outline'} size={16} color={colors.text} style={{marginTop: 4}} />
              <Text style={{
                fontSize: 14,
                color: colors.grey_d,
                marginLeft: 10,
                marginTop: 5
              }}>{currentUser.blood == null ? 'Grupa krwi' : currentUser.blood}</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles2.block, {
            height: 50,
            borderColor: colors.grey,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
          }]}
          onPress={() => auth.signOut().then(() => console.log('User signed out!'))}
        >
          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: 'bold'
          }}>Wyloguj</Text>
        </TouchableOpacity>
        {/* <View style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 20
        }}>
          <Text style={{
            color: colors.primary
          }}>Usuń konto</Text>
        </View> */}
        
    </ScrollView>
  );
}


const styles2 = StyleSheet.create({
  block: {
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  viewMore:{
    width: '50%',
    alignItems: 'flex-end',
    marginLeft: '50%',
    marginVertical: 10,
  }
});