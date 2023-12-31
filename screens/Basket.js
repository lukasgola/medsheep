import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet, LayoutAnimation } from 'react-native'

import { useBasket } from '../providers/BasketProvider';
import { useKit } from '../providers/KitProvider';
import { useTheme } from '../theme/ThemeProvider';

import CartItem from '../components/CartItem';
import BottomSheet from '../components/BottomSheet';
import Amounter from '../components/Amounter';
import Swipe from '../components/Swipe';

//Firebase
import { query, collection, getDocs, where, updateDoc, addDoc  } from 'firebase/firestore';
import { removeFromBasket, db, auth, addToKit } from '../firebase/firebase-config';

export default function Basket({navigation}) {


  const { basket, setBasket, setNewBasket } = useBasket();
  const { kit, setKit, setNewKit } = useKit(); 
  const { colors } = useTheme();

  const [ cumulation, setCumulation ] = useState(0);
  const [ itemsNumber, setItemsNumber ] = useState(0);

  const [ modalVisible, setModalVisible ] = useState(false);

  const [ item, setItem ] = useState(null);
  const [ number, setNumber ] = useState(null);
  const [ price, setPrice ] = useState(null);

  const [ test, setTest ] = useState(null);

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

  const onSettingsClick = ({item, index}) => {
    setItem(item)
    setNumber(item.number)
    setPrice(item.price)
    setTest(prevOpenedRow)
    setModalVisible(true)
  }

  const onDeleteClick = ({ item, index }) => {
    let a = basket;
    a.splice(index, 1);
    setNewBasket([...a]);
    removeFromBasket(item.id);
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  let row = [];
  let prevOpenedRow;

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };


  const onModify = async () => {

    try {
      const q = query(collection(db, "users", auth.currentUser.uid, "basket"), where("product", "==", item.product));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        let tempBasket = [...basket];

        for(let i = 0; i < tempBasket.length; i++){
            if(tempBasket[i].id == doc.id){
                tempBasket[i].number = number;
                tempBasket[i].price = price;
            }
        }

        setNewBasket(tempBasket);
        
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


  const onOrder = () => {
    let index = 0;
    let tempItems = kit;
    basket.map(async(item) => {
      const result = tempItems.filter((element) => element.product.name == item.product.name);
        
    if(result.length !== 0){
      console.log('dziala 1');
        try {
            const q = query(collection(db, "users", auth.currentUser.uid, "kit"), where("product", "==", item.product));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const data = {
                    ...doc.data(),
                    id: doc.id,
                }

                //let tempKit = [...kit];

                for(let i = 0; i < tempItems.length; i++){
                    if(tempItems[i].id == doc.id){
                      tempItems[i].pillNumber = parseFloat(data.pillNumber) + (parseFloat(item.product.amount) * parseFloat(item.number));
                    }
                }

                //setNewKit(tempKit);
      
                updateDoc(doc.ref, {
                  pillNumber: parseFloat(data.pillNumber) + (parseFloat(item.product.amount) * parseFloat(item.number)),
                });
                
            });
      
          } catch (e) {
            console.error("Error updating document: ", e);
          }
    }
    else{
      console.log('dziala 2');
        try {
            await addDoc(collection(db, `users/${auth.currentUser.uid}/kit`), {
                product: item.product,
                pillNumber: item.product.amount * item.number,
            }).then(function(docRef) {
                tempItems.push({id: docRef.id, product: item.product, pillNumber: item.product.amount * item.number})
                //setKit({id: docRef.id, product: item.product, pillNumber: item.product.amount * item.number})
            });
            } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

      onDeleteClick({item, index});
    })

    setNewKit(tempItems);
    
  }

  const BasketItem = ({item, index}) => {
    return(
      <Swipe
        index={index}
        settingsClick={() => onSettingsClick({item, index})}
        trashClick={() => onDeleteClick({item, index})}
        closeRow={() => closeRow(index)}
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
        }}
      >
        <CartItem item={item.product} number={item.number} price={item.price} />
      </Swipe>
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
            onPress={() => onOrder()}
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
        onConfirm={onModify}
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