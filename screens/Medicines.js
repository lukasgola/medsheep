import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { useLayoutEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, LayoutAnimation, Image, Platform } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated from 'react-native-reanimated';


//Providers
import { useTheme } from '../theme/ThemeProvider';
import { useBasket } from '../providers/BasketProvider';
import { useKit } from '../providers/KitProvider';

//Components
import BottomSheet from '../components/BottomSheet';
import Amounter from '../components/Amounter';
import CartItem from '../components/CartItem';
import SearchBar from '../components/SearchBar';


import { DATA } from '../assets/data';

//Firebase
import { addToBasket, addToKit } from '../firebase/firebase-config';

export default function Medicines({navigation}) {

  const {colors} = useTheme();
  const {basket, setBasket, setNewBasket} = useBasket();

  const {kit, setKit, setNewKit} = useKit();

  const [filteredData, setFilteredData] = useState(DATA);
  const [selectedItem, setSelectedItem] = useState({name: 'None'});

  const [modalVisible, setModalVisible] = useState(false);

  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState(0)

  const goUp = (amount) => {
    setNumber(amount)
    setPrice((selectedItem.price*(number+1)).toFixed(2))
  }

  const goDown = (amount) => {
      number == 0 ? console.log('You can not') : [setNumber(amount), setPrice((selectedItem.price*amount).toFixed(2))]
  }

  const onChangeText = (amount) => {
    setNumber(amount)
      setPrice((selectedItem.price*(amount)).toFixed(2))
  }


  useLayoutEffect(() => {
    if(Platform.OS == 'ios'){
      navigation.setOptions({
        headerSearchBarOptions: {
          visible: true,
          placeholder: 'Szukaj',
          onChangeText: (event) => {
            searchFilterFunction(event.nativeEvent.text);
            LayoutAnimation.configureNext(layoutAnimConfig)
          },
        },
      });
    }
    
  }, [navigation]);

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

  const searchFilterFunction = (text) => {
    // Trim and convert text to uppercase

      const searchText = text.trim().toUpperCase();
  
      if (searchText.length > 0) {
        const newData = DATA.filter(item => {
          const itemName = item.name ? item.name.toUpperCase() : '';
          return itemName.includes(searchText);
        });
        setFilteredData(newData);
      } else {
        setFilteredData(DATA);
      }
    
  };
  

  const onItemChoice = (item) => {
    console.log(item)
    setSelectedItem(item)
    setPrice(item.price)
    setNumber(1)
    setModalVisible(true)
  }

  const onAddToKit = () => {
      addToKit(selectedItem, number*selectedItem.amount, kit, setKit, setNewKit)
      //addToBasket(selectedItem, number, price, basket, setBasket, setNewBasket)
  }

  const MedItem = ({item}) => {
    return(
      <TouchableOpacity 
      onPress={() => navigation.navigate('Lek', {item: item})}
      style={[{
        backgroundColor: colors.background,
        width: '90%',
        height: 65,
        marginLeft: '5%',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
      }]}>
        <Animated.Image style={{
          width: 50,
          height: 50,
          borderRadius: 10,
        }}
          resizeMode='contain'
          source={{uri: item.img}}
          sharedTransitionTag="tag"
        />
        <View style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text
          }}>{item.name}</Text>
          <Text style={{
            fontSize: 14,
            color: colors.grey_d,
            marginTop: 2
          }}>{item.amount} {item.unit}</Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor: colors.grey_l,
          width: 45,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
          onPress={() => onItemChoice(item)}
        >
          <Ionicons name={'add-outline'} size={25} style={{marginLeft: 3}} color={colors.text} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView 
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BottomSheet 
        visible={modalVisible}
        setModalVisible={setModalVisible}
        text={'Dodaj do apteczki'}
        onConfirm={onAddToKit}
      >
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
            <CartItem item={selectedItem} pillNumber={number*selectedItem.amount}/> 
          </View>
          <View style={{
            paddingTop: 20
          }}>
            <Amounter 
                item={selectedItem} 
                setModalVisible={setModalVisible} 
                goUp={goUp}
                goDown={goDown}
                onChangeText={onChangeText}
                number={selectedItem.pillNumber}
            />
          </View>
          
        </View>
        
      </BottomSheet>
      
      <FlatList
        data={filteredData}
        renderItem={({item}) => <MedItem item={item} />}
        keyExtractor={item => item.id}
        style={{
          width: '100%'
        }}
      />

    </SafeAreaView>
  );
}
