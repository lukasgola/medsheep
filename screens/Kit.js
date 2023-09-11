import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet, LayoutAnimation } from 'react-native'

import { useKit } from '../providers/KitProvider';
import { useTheme } from '../theme/ThemeProvider';
import { useData } from '../providers/DataProvider';

import CartItem from '../components/CartItem';
import BottomSheet from '../components/BottomSheet';
import Amounter from '../components/Amounter';
import Swipe from '../components/Swipe';

//Firebase
import { query, collection, getDocs, where, updateDoc  } from 'firebase/firestore';
import { removeFromKit, db, auth } from '../firebase/firebase-config';

export default function Kit({navigation, route}) {


  const { kit, setKit, setNewKit } = useKit();
  const { colors } = useTheme();
  const { data, setData } = useData();

  const [ modalVisible, setModalVisible ] = useState(false);

  const [ item, setItem ] = useState(null);
  const [ number, setNumber ] = useState(null);
  const [ price, setPrice ] = useState(null);

  const [ test, setTest ] = useState(null);

  const [ kitMode, setKitMode ] = useState(route.params.kitMode ? route.params.kitMode : false)
  const [ chooseMode, setChooseMode ] = useState(route.params.chooseMode ? route.params.chooseMode : false)

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

  const onSettingsClick = ({item, index}) => {
  if(chooseMode){
    setData({
      id: item.id,
      product: item.product
    });
  }
  else{
    setItem(item)
    setNumber(item.number)
    setPrice(item.price)
    setTest(prevOpenedRow)
    setModalVisible(true)
  }

  }

  const onDeleteClick = ({ item, index }) => {
    let a = kit;
    a.splice(index, 1);
    setNewKit([...a]);
    removeFromKit(item.id);
    LayoutAnimation.configureNext(layoutAnimConfig)
  };

  let row = [];
  let prevOpenedRow;

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    
    prevOpenedRow = row[index];
  };


  const onConfirm = async () => {

    try {
      const q = query(collection(db, "users", auth.currentUser.uid, "kit"), where("product", "==", item.product));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        let tempKit = [...kit];

        for(let i = 0; i < tempKit.length; i++){
            if(tempKit[i].id == doc.id){
                tempKit[i].number = number;
                tempKit[i].price = price;
            }
        }

        setNewKit(tempKit);
        
        updateDoc(doc.ref, {
          number: number,
          price: price
        });
          
      });

    } catch (e) {
      console.error("Error updating document: ", e);
    }

    test.close();

  }

  const KitItem = ({item, index}) => {
    
    return(
      <Swipe
        index={index}
        settingsClick={() => onSettingsClick({item, index})}
        trashClick={() => onDeleteClick({item, index})}
        closeRow={() => closeRow(index)}
        row={row}
        chooseMode={chooseMode}
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
          borderColor: data.product == item.product ? colors.primary : colors.grey
        }}
      >
        <CartItem item={item.product} number={item.number} price={item.price} pillNumber={item.pillNumber} />
      </Swipe>
    ) 
  }

  return (
    <View>
      <FlatList
        data={kit}
        renderItem={({item, index}) => KitItem({item, index})}
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