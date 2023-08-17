import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import { useBasket } from '../providers/BasketProvider';
import { useTheme } from '../theme/ThemeProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CartItem from '../components/CartItem';
import BottomSheet from '../components/BottomSheet';

export default function Basket({navigation}) {


  const { basket, setBasket } = useBasket();
  const { colors } = useTheme();

  const [ cumulation, setCumulation ] = useState(0);
  const [ itemsNumber, setItemsNumber ] = useState(0);

  const [ modalVisible, setModalVisible ] = useState(false);

  const [ item, setItem ] = useState(null);

  const onConfirm = () => {

  }

  const onClickItem = (item) => {
    setItem(item);
    setModalVisible(true);
    
  }

  useEffect(() =>{
    setCumulation(0);
    basket.map(item => (
      setCumulation((cumulation) => (parseFloat(cumulation) + parseFloat(item.price)).toFixed(2))
    ))
    setItemsNumber(basket.length);
  },[basket])

  const BasketItem = ({item}) => {
    return(
      <TouchableOpacity 
        onLongPress={() => onClickItem(item) }
        style={{
          width: '90%',
          height: 65,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginLeft: '5%',
          marginTop: 10,
          flexDirection: 'row',
          paddingHorizontal: '3%',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.13,
          shadowRadius: 2.62,
          elevation: 4,
      }}>
        <CartItem item={item.product} number={item.number} price={item.price} />
      </TouchableOpacity>
    )
    
  }


  return (
    <View>
      <View style={{
        position: 'absolute',
        backgroundColor: colors.background,
        width: '100%',
        height: 70,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        zIndex: 1
      }}>
        <View style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 20,
          }}>{cumulation} zł</Text>
          <Text style={{
            fontSize: 12,
            color: colors.grey_d
          }}>{itemsNumber} produkty</Text>
        </View>
        
        <TouchableOpacity 
            style={{ 
                width: '50%',
                height: 50,
                justifyContent: 'center', 
                alignItems: 'center', 
                borderRadius: 10,
                backgroundColor: colors.primary,
            }}>
            <Text style={{
                color: colors.background, 
                fontWeight: 'bold',
                fontSize: 16
            }}>Zamów</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={basket}
        renderItem={({item}) => <BasketItem item={item} />}
        keyExtractor={item => item.id}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
      <BottomSheet 
        visible={modalVisible} 
        setModalVisible={setModalVisible}
        text={'Zarządzaj lekiem'}
        onConfirm={onConfirm}
      >
        {item ? <CartItem item={item.product} number={item.number} price={item.price} /> : <View></View> }
            
        </BottomSheet>
    </View>
  )
}