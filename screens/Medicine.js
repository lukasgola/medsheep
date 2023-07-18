import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, FlatList, Modal, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '../theme/ThemeProvider';

import BottomSheet from '../components/BottomSheet';
import Amounter from '../components/Amounter';
import CartItem from '../components/CartItem';

//Firebase
import { addToBasket } from '../firebase/firebase-config';

export default function Medicine({route, navigation}) {

    const {item} = route.params;
    const {colors} = useTheme();

    const [liked, setLiked] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [number, setNumber] = useState(1)
    const [price, setPrice] = useState(item.price*number)

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

    const onAddToBasket = () => {
        addToBasket(item, number, price);
    }


    const Item = ({item}) => {
        return(
            <Text style={{
                fontSize: 14,
                color: colors.grey_d
            }}>{item.name}</Text>
        )
    }

  return (
    <View
        style={{
            flex: 1,
    }}>
        <BottomSheet 
            visible={modalVisible} 
            setModalVisible={setModalVisible}
            text={'Dodaj do koszyka'}
            onConfirm={onAddToBasket}
        >
            <CartItem item={item} number={number} price={price} />
        </BottomSheet>
        <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            style={{ 
                position: 'absolute',
                left: '5%',
                bottom: 20,
                width: '90%',
                height: 50,
                justifyContent: 'center', 
                alignItems: 'center', 
                borderRadius: 10,
                backgroundColor: colors.primary,
                zIndex: 1
            }}>
            <Text style={{
                color: colors.background, 
                fontWeight: 'bold',
                fontSize: 16
            }}>Dodaj do koszyka</Text>
        </TouchableOpacity>
        
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: colors.background,
                padding: '5%',
            }}
        >
            <TouchableOpacity 
                style={{
                    position: 'absolute',
                    top: 300,
                    right: 0,
                    width: 50,
                    height: 50,
                    backgroundColor: colors.grey_l,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1
                }}
                onPress={() => setLiked(!liked)}
            >
                <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={25} color={liked ? colors.primary : colors.text} />
            </TouchableOpacity>
            <Image 
                source={item.img} 
                resizeMode='contain' 
                style={{width: '60%', height: 300, marginLeft: '20%'}} 
            />
            <Text style={{
                color: colors.text,
                fontSize: 24,
                fontWeight: 'bold'
            }}>{item.name}</Text>
            <Text style={{
                color: colors.grey_d,
                fontSize: 16,
                marginTop: 10,
            }}>{item.amount} tabletek</Text>

            <Text style={{
                color: colors.grey_d,
                fontSize: 16,
                marginTop: 5,
                width: '100%',
                textAlign: 'right',
            }}>{price} zł</Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={200} 
                style={{
                width: '100%',
                height: 50,
                backgroundColor: colors.background,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>

                <Text style={{
                    fontSize: 30,
                }}>{item.price} zł</Text>
                
                <Amounter 
                    item={item} 
                    setModalVisible={setModalVisible} 
                    goUp={goUp}
                    goDown={goDown}
                    onChangeText={onChangeText}
                />
            </KeyboardAvoidingView>

            <View style={{
                marginTop: 30,
            }}>
                <FlatList
                    data={item.symptoms}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={
                        <View style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: colors.primary,
                            marginVertical: 7,
                            marginHorizontal: 10
                        }}>

                        </View>
                    }
                />
            </View>
            <Text style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
            }}>Opis</Text>
            <Text style={{
                color: colors.grey_d,
                fontSize: 16,
                marginTop: 5,
                marginBottom: 150
            }}>{item.desc}</Text>
        </ScrollView>
    </View>
  );
}
