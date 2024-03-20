import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { useLayoutEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, LayoutAnimation, Image } from 'react-native';

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


//Firebase
import { addToBasket, addToKit } from '../firebase/firebase-config';

export default function Medicines({navigation}) {

  const {colors} = useTheme();
  const {basket, setBasket, setNewBasket} = useBasket();

  const {kit, setKit, setNewKit} = useKit();

  const DATA = [
    {
      id: 1,
      name: 'Apap Noc',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: true,
      price: 12.99,
      img: require('../assets/med/apap_noc.jpg'),
      amount: 30,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    },
    {
      id: 2,
      name: 'Rutinoscorbin',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: true,
      price: 23.99,
      img: require('../assets/med/rutino.png'),
      amount: 90,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    },
    {
      id: 3,
      name: 'Etopiryna',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: false,
      price: 19.99,
      img: require('../assets/med/eopiryna.jpg'),
      amount: 30,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    },
    {
      id: 4,
      name: 'Ibum Express Forte',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: true,
      price: 49.99,
      img: require('../assets/med/apap_noc.jpg'),
      amount: 30,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    },
    {
      id: 5,
      name: 'Apap Noc',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: true,
      price: 12.99,
      img: require('../assets/med/apap_noc.jpg'),
      amount: 30,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    },
    {
      id: 6,
      name: 'Rutinoscorbin',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: true,
      price: 23.99,
      img: require('../assets/med/rutino.png'),
      amount: 90,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    },
    {
      id: 7,
      name: 'Etopiryna',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: false,
      price: 19.99,
      img: require('../assets/med/eopiryna.jpg'),
      amount: 30,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    },
    {
      id: 8,
      name: 'Ibum Express Forte',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      availability: true,
      price: 49.99,
      img: require('../assets/med/apap_noc.jpg'),
      amount: 30,
      symptoms: [
        {
          id: 1,
          name: 'Ból głowy'
        },
        {
          id: 2,
          name: 'Ból gardła'
        },
        {
          id: 3,
          name: 'Gorączka'
        },
        {
          id: 4,
          name: 'Ból mięśni'
        },
        {
          id: 5,
          name: 'Bóle miesiączkowe'
        },
      ]
    }
  ]

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
      setPrice((selectedItem.price*(amount)).toFixed(2))
  }


  useLayoutEffect(() => {
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
    if(text){ 
        const newData = DATA.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        
        setFilteredData(newData);
    } else {
        setFilteredData(DATA);
    }
  }

  const onItemChoice = (item) => {
    console.log(item)
    setSelectedItem(item)
    setPrice(item.price)
    setNumber(1)
    setModalVisible(true)
  }

  const onAddToKit = () => {
      addToKit(selectedItem, number, kit, setKit, setNewKit)
      //addToBasket(selectedItem, number, price, basket, setBasket, setNewBasket)
  }

  const MedItem = ({item}) => {
    return(
      <TouchableOpacity 
      onPress={() => navigation.navigate('Lek', {item: item})}
      style={[{
        backgroundColor: colors.background,
        width: '90%',
        height: 100,
        marginLeft: '5%',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey
      }]}>
        <Animated.Image style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          marginLeft: 15,
          marginTop: 15,
        }}
          resizeMode='contain'
          source={item.img}
          sharedTransitionTag="tag"
        />
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text
          }}>{item.name}</Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor: colors.grey_l,
          width: 80,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
          right: 10
        }}
          onPress={() => onItemChoice(item)}
        >
          <Ionicons name={'add-outline'} size={25} style={{marginLeft: 8}} color={colors.text} />
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
          width: '100%',
          alignItems: 'center'
        }}>
          
          <CartItem item={selectedItem} number={number} price={price} />
          
          <View style={{
            marginVertical: 20,
          }}>
            <Amounter 
              item={selectedItem} 
              setModalVisible={setModalVisible} 
              goUp={goUp}
              goDown={goDown}
              onChangeText={onChangeText}
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
