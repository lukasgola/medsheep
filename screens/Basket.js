import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet, Button } from 'react-native'

import { useBasket } from '../providers/BasketProvider';
import { useTheme } from '../theme/ThemeProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CartItem from '../components/CartItem';
import BottomSheet from '../components/BottomSheet';

import Swipeable from 'react-native-gesture-handler/Swipeable';

//Firebase
import { addToBasket, removeFromBasket } from '../firebase/firebase-config';

export default function Basket({navigation}) {


  const { basket, setBasket, setNewBasket } = useBasket();
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


  let row = [];
  let prevOpenedRow;

  const deleteItem = ({ item, index }) => {
    let a = basket;
    a.splice(index, 1);
    setNewBasket([...a]);
    removeFromBasket(item.id);
  };

  const BasketItem = ({item, index}) => {

    const closeRow = (index) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX) => {
      return (
        <TouchableOpacity
          onPress={() => deleteItem({item, index})}
          style={{
            //alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 70,
            marginTop: 10,
            paddingLeft: 30
          }}
        >
          <Ionicons name={'trash-outline'} size={25} color={colors.primary} />
        </TouchableOpacity>
      );
    };
    
    return(
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX)
        }
        onSwipeableWillOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        rightOpenValue={-100}
      >
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
      </Swipeable>
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
        //renderItem={({item, index}) => <BasketItem item={item} index={index} />}
        renderItem={({item, index}) => BasketItem({item, index})}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#efefef',
    margin: 20,
    minHeight: 50,
  },
  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#818181',
    margin: 20,
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});