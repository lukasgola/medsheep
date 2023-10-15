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

  const OrderItem = ({item}) => {
    return(
      <View style={{
        width: '100%',
        backgroundColor: colors.grey_l,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 10
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          marginBottom: 5,
        }}>
          <View style={{
            width: 6,
            height: 6,
            backgroundColor: colors.primary,
            borderRadius: 3
          }}></View>
          <Text style={{
            fontSize: 16,
            color: colors.text,
            fontWeight: 'bold',
            marginLeft: 5
          }}>12.06.2023</Text>
        </View>
        <CartItem />
      </View>
    )
  }

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
          <Image 
            source={require('../assets/user_img.jpeg')} 
            resizeMode='contain'
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
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
              }}>{currentUser.birthdate}</Text>
            </View>
            
            <View style={{flexDirection: 'row', marginLeft: 20,}}>
              <Ionicons name={'man-outline'} size={16} color={colors.text} style={{marginTop: 4}} />
              <Text style={{
                fontSize: 14,
                color: colors.grey_d,
                marginLeft: 10,
                marginTop: 5
              }}>{currentUser.height} cm</Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20,}}>
              <Ionicons name={'barbell-outline'} size={16} color={colors.text} style={{marginTop: 4}} />
              <Text style={{
                fontSize: 14,
                color: colors.grey_d,
                marginLeft: 10,
                marginTop: 5
              }}>{currentUser.weight} kg</Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20,}}>
              <Ionicons name={'water-outline'} size={16} color={colors.text} style={{marginTop: 4}} />
              <Text style={{
                fontSize: 14,
                color: colors.grey_d,
                marginLeft: 10,
                marginTop: 5
              }}>{currentUser.blood}</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <View style={[styles2.block,{
          backgroundColor: colors.background,
          borderColor: colors.grey
        }]}>
          <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginTop: 15,
              marginBottom: 10
          }}>Apteczka</Text>

          <FlatList
            data={kit.slice(0,3)}
            renderItem={({item}) => <CartItem item={item.product} number={item.number} price={item.price} pillNumber={item.pillNumber} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}

          />

          <View style={{
            width: '100%',
            marginTop: 10,
            borderTopColor: colors.grey,
            borderTopWidth: 1,
            alignItems: 'flex-end',
            padding: 5
          }}>
            <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginTop: 5
            }}>{cumulation}</Text>
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Apteczka', {chooseMode: false})}
            style={styles2.viewMore}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              fontWeight: 'bold',
            }}>Zobacz więcej...</Text>
          </TouchableOpacity>
        </View>
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