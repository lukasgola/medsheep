import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet, LayoutAnimation } from 'react-native'

import { useKit } from '../providers/KitProvider';
import { useTheme } from '../theme/ThemeProvider';
import { useData } from '../providers/DataProvider';

import Swipe from '../components/Swipe';
import CartItem from '../components/CartItem';
import BottomSheet from '../components/BottomSheet';
import Amounter from '../components/Amounter';

//Firebase
import { query, collection, getDocs, where, updateDoc  } from 'firebase/firestore';
import { removeFromKit, db, auth, getKit } from '../firebase/firebase-config';
import { useIsFocused } from '@react-navigation/native';

export default function Kit({navigation, route}) {


  const { kit, setKit, setNewKit } = useKit();
  const { colors } = useTheme();

  const isFocused = useIsFocused();

  const {data, setData} = useData();

  const [ modalVisible, setModalVisible ] = useState(false);

  const [ item, setItem ] = useState(null);
  const [ number, setNumber ] = useState(null);
  const [ price, setPrice ] = useState(null);

  const [ chosenItem, setChosenItem ] = useState(data.id != null);

  const [ chooseMode, setChooseMode ] = useState(route.params?.chooseMode)


  React.useLayoutEffect(() => {
    if(chosenItem && chooseMode){
        navigation.setOptions({
          headerRight: () => 
              <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  title="Info"
                  color="#fff"
              >
                  <Text style={{
                  color: colors.primary,
                  fontSize: 18,
                  fontWeight: 'bold'
                  }}>Ok</Text>
              </TouchableOpacity>
      });
    }
   
  }, [chooseMode, chosenItem]);


  const goUp = (amount) => {
    setNumber(amount)
    setPrice((item.product.price*(number+1)).toFixed(2))
  }

  const goDown = (amount) => {
      number == 0 ? console.log('You can not') : [setNumber(amount), setPrice((item.product.price*amount).toFixed(2))]
  }

  const onChangeText = (amount) => {
      setNumber(amount)
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

  const onSettingsClick = (item) => {
    if(chooseMode){
      setData({
        id: item.id,
        product: item.product
      });
      setChosenItem(true)
    } else {
      setItem(item)
      setNumber(item.pillNumber)
      setPrice(item.price)
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


  const onConfirm = async () => {

    try {
      const q = query(collection(db, "users", auth.currentUser.uid, "kit"), where("product", "==", item.product));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        let tempKit = [...kit];

        for(let i = 0; i < tempKit.length; i++){
            if(tempKit[i].id == doc.id){
                tempKit[i].pillNumber = number;
                tempKit[i].price = price;
            }
        }

        setNewKit(tempKit);
        
        updateDoc(doc.ref, {
          pillNumber: number,
          price: price
        });
          
      });

    } catch (e) {
      console.error("Error updating document: ", e);
    }

  }

  let row = [];
  let prevOpenedRow;

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    
    prevOpenedRow = row[index];
  };

  const KitItem = ({item, index}) => {
    
    return(
      <Swipe
        index={index}
        trashClick={() => onDeleteClick({item, index})}
        closeRow={() => closeRow(index)}
        onSettingsClick={() => onSettingsClick(item)}
        row={row}
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
          borderWidth: 1,
          borderColor: data.id == item.id && route.params?.chooseMode ? colors.primary : colors.grey
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
        ListEmptyComponent={
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            marginTop: '50%',
          }}>
            <Text style={{
              color: colors.grey_d
            }}>Nie ma żadnych leków</Text>
          </View>
        }
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
          <View style={{
            width: '100%',
            paddingHorizontal: 15,
            borderRadius: 10,
            borderColor: colors.grey,
            borderWidth: 1,
          }}>
            <CartItem item={item.product} pillNumber={number} price={price} /> 
          </View>
          <View style={{
            paddingTop: 20
          }}>
            <Amounter 
                item={item} 
                setModalVisible={setModalVisible} 
                goUp={goUp}
                goDown={goDown}
                onChangeText={onChangeText}
                number={item.pillNumber}
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