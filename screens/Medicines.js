import { useLayoutEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '../theme/ThemeProvider';

import BottomSheet from '../components/BottomSheet';
import Amounter from '../components/Amounter';
import CartItem from '../components/CartItem';

export default function Medicines({navigation}) {

  const {colors} = useTheme();

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

  const CATDATA = [
    {
      id: 1,
      category: 'Ból głowy'
    },
    {
      id: 2,
      category: 'Gorączka'
    },
    {
      id: 3,
      category: 'Katar'
    },
    {
      id: 4,
      category: 'Przeziębienie'
    },
  ]

  const [filteredData, setFilteredData] = useState(DATA);
  const [catSelected, setCatSelected] = useState(1);
  const [item, setItem] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState(0)

  const goUp = (amount) => {
    setNumber(amount)
    setPrice((item.price*(number+1)).toFixed(2))
  }

  const goDown = (amount) => {
      number == 0 ? console.log('You can not') : [setNumber(amount), setPrice((item.price*amount).toFixed(2))]
  }

  const onChangeText = (amount) => {
      setPrice((item.price*(amount)).toFixed(2))
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        visible: true,
        placeholder: 'Szukaj',
        onChangeText: (event) => {
          searchFilterFunction(event.nativeEvent.text);
        },
      },
    });
  }, [navigation]);

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


  const MedItem = ({item}) => {
    return(
      <TouchableOpacity 
      onPress={() => navigation.navigate('Lek', {item: item})}
      style={{
        backgroundColor: colors.background,
        width: '90%',
        height: 100,
        marginLeft: '5%',
        borderRadius: 20,
        marginTop: 20,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2.62,
        elevation: 4,
      }}>
        <Image style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          marginLeft: 15,
          marginTop: 15,
        }}
        resizeMode='contain'
          source={item.img}
        />
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text
          }}>{item.name}</Text>
          <Text style={{
            fontSize: 12,
            marginTop: 5,
            color: colors.grey_d
          }}>{item.amount} tab.</Text>
          <Text style={{
            fontSize: 18,
            marginTop: 5,
            color: colors.text
          }}>{item.price} zł</Text>
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
          disabled={item.availability ? false : true}
          onPress={() => [setItem(item),setModalVisible(true)]}
        >
          <MaterialCommunityIcons name={'cart-minus'} size={25} style={{marginLeft: 8}} color={item.availability ? colors.text : colors.grey} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  const CatItem = ({item}) => {
    return(
      <TouchableOpacity style={{
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 10
      }}
        onPress={() => setCatSelected(item.id)}
      >
        <Text style={{
          fontSize: 14,
          fontWeight: item.id == catSelected ? 'bold' : 'regular',
          color: item.id == catSelected ? colors.text : colors.grey_d
        }}>{item.category}</Text>
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
        text={'Dodaj do koszyka'}
      >
        <View style={{
          width: '100%',
          alignItems: 'center'
        }}>
          
          <CartItem />
          
          <View style={{
            marginVertical: 20,
          }}>
            <Amounter 
              item={item} 
              setModalVisible={setModalVisible} 
              goUp={goUp}
              goDown={goDown}
              onChangeText={onChangeText}
            />
          </View>
          <View style={{
                width: '100%',
                height: 50,
                backgroundColor: colors.background,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
                marginBottom: 40
            }}>
                <TouchableOpacity style={{
                    width: '40%',
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: colors.grey_l,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colors.text
                    }}>Cofnij</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '50%',
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colors.background
                    }}>Kontynuuj</Text>
                </TouchableOpacity>
            </View>
        </View>
        
      </BottomSheet>
      <FlatList
        data={filteredData}
        renderItem={({item}) => <MedItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <FlatList
            data={CATDATA}
            renderItem={({item}) => <CatItem item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={
              <View style={{
                  width: 20,
              }}>

              </View>
            }
            style={{
              marginTop: 20,
              paddingHorizontal: 20
            }}
          />
        }
      />
    </SafeAreaView>
  );
}
