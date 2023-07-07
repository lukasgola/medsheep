import { useLayoutEffect, useState } from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '../theme/ThemeProvider';

export default function Order({navigation}) {

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
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
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
      amount: 60,
      symptoms: [
        {
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
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
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
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
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
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
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
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
      amount: 60,
      symptoms: [
        {
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
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
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
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
          name: 'Ból głowy'
        },
        {
          name: 'Ból gardła'
        },
        {
          name: 'Gorączka'
        },
        {
          name: 'Ból mięśni'
        },
        {
          name: 'Bóle miesiączkowe'
        },
      ]
    }
  ]


  const [filteredData, setFilteredData] = useState(DATA);


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


  const Item = ({item}) => {
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
          backgroundColor: colors.grey_l,
          width: 70,
          height: 70,
          borderRadius: 10,
          marginLeft: 15,
          marginTop: 15,
        }}
          source={item.img}
        />
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text
          }}>{item.name}</Text>
          <Text style={{
            fontSize: 14,
            marginTop: 5,
            color: colors.grey_d
          }}>{item.amount} tab.</Text>
          <Text style={{
            fontSize: 20,
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
        >
          <MaterialCommunityIcons name={'cart-minus'} size={25} style={{marginLeft: 8}} color={item.availability ? colors.text : colors.grey} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView 
      style={styles.container}
      contentInsetAdjustmentBehavior="never"
    >
      <FlatList
        data={filteredData}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        style={{
          width: '100%'
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
