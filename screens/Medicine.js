import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, FlatList, Modal, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '../theme/ThemeProvider';

import BottomSheet from '../components/BottomSheet';


export default function Medicine({route, navigation}) {

    const {item} = route.params;
    const {colors} = useTheme();

    const [liked, setLiked] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [number, setNumber] = useState(1)
    const [price, setPrice] = useState(item.price*number)

    const goUp = () => {
        setNumber(number+1)
        setPrice((item.price*(number+1)).toFixed(2))
    }

    const goDown = () => {
        number == 0 ? console.log('You can not') : [setNumber(number-1), setPrice((item.price*(number-1)).toFixed(2))]
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
        >
            <View style={{
                width: '100%',
                paddingHorizontal: '5%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Image style={{
                    width: 80,
                    height: 80,
                }} source={item.img} resizeMode='contain' />
                <Text style={{
                    fontSize: 20,
                }}>x{number}</Text>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>{price} zł</Text>
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
                
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                    onPress={() => goDown()}
                    style={{
                        width: 50,
                        height: 50,
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        backgroundColor: colors.grey_l,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <MaterialCommunityIcons name={'minus'} size={40} color={colors.text} />
                </TouchableOpacity>
                <TextInput
                    onChangeText={(value) => value == '' ? [setNumber(0), setPrice(0)] : [setNumber(parseInt(value)), setPrice((item.price*(value)).toFixed(2))]}
                    value={number.toString()}
                    keyboardType="number-pad"
                    selectionColor={colors.primary}
                    enterKeyHint='done'
                    textAlign='center'
                    style={{
                        height: 50,
                        width: 50,
                        borderWidth: 0,
                        backgroundColor: colors.grey_l,
                        fontSize: 18,
                    }}
                />
                
                <TouchableOpacity 
                    onPress={() => goUp()}
                    style={{
                        width: 50,
                        height: 50,
                        borderBottomRightRadius: 10,
                        borderTopRightRadius: 10,
                        backgroundColor: colors.grey_l,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <MaterialCommunityIcons name={'plus'} size={40} color={colors.text} />
                </TouchableOpacity>
            </View>
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
