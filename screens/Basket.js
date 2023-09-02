import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet, LayoutAnimation } from 'react-native'

import { useBasket } from '../providers/BasketProvider';
import { useTheme } from '../theme/ThemeProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../styles/styles';

import CartItem from '../components/CartItem';
import BottomSheet from '../components/BottomSheet';
import Amounter from '../components/Amounter';

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
  const [ number, setNumber ] = useState(null);
  const [ price, setPrice ] = useState(null);

  const onConfirm = () => {

  }

  const onClickItem = (item) => {
    setItem(item)
    setNumber(item.number)
    setPrice(item.price)
    setModalVisible(true)
  }

  const goUp = (amount) => {
    setNumber(amount)
    setPrice((item.product.price*(number+1)).toFixed(2))
  }

  const goDown = (amount) => {
      number == 0 ? console.log('You can not') : [setNumber(amount), setPrice((item.product.price*amount).toFixed(2))]
  }

  const onChangeText = (amount) => {
      setPrice((item.product.price*(amount)).toFixed(2))
  }

  useEffect(() =>{
    setCumulation(0);
    basket.map(item => (
      setCumulation((cumulation) => (parseFloat(cumulation) + parseFloat(item.price)).toFixed(2))
    ))
    setItemsNumber(basket.length);
  },[basket])

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };


  let row = [];
  let prevOpenedRow;

  const deleteItem = ({ item, index }) => {
    let a = basket;
    a.splice(index, 1);
    setNewBasket([...a]);
    removeFromBasket(item.id);
    LayoutAnimation.configureNext(layoutAnimConfig)
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
        containerStyle={[styles.shadow, {
          paddingBottom: 10
        }]}
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
          flexDirection: 'row',
          paddingHorizontal: '3%',
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
          height: '100%',
          paddingTop: 10,
        }}
      />
      <BottomSheet 
        visible={modalVisible} 
        setModalVisible={setModalVisible}
        text={'Zarządzaj lekiem'}
        onConfirm={onConfirm}
      >
        
        {item ? 
        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CartItem item={item.product} number={number} price={price} /> 
          <View style={{
            paddingTop: 20
          }}>
            <Amounter 
                item={item} 
                setModalVisible={setModalVisible} 
                goUp={goUp}
                goDown={goDown}
                onChangeText={onChangeText}
                number={item.number}
            />
          </View>
          
        </View>
        :
          <View></View> 
        
        }
            
        </BottomSheet>
    </View>
  )
}