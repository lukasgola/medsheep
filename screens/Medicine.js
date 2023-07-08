import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, Modal, TextInput } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

export default function Medicine({route, navigation}) {

    const {item} = route.params;
    const {colors} = useTheme();

    const windowWidth = Dimensions.get('screen').width;

    const [liked, setLiked] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [number, setNumber] = useState(1)
    const [price, setPrice] = useState(item.price*number)

    const goUp = () => {
        setNumber(number+1)
    }

    const goDown = (value) => {
        number == 0 ? console.log('You can not') : [setNumber(number-1), setPrice(item.price*(number-1))]
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
    <View style={styles.container}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'black',
                opacity: 0.3
            }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        width: '100%',
                        height: 300,
                        backgroundColor: colors.background,
                        position: 'absolute',
                        bottom: 0,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: '5%',
                        paddingVertical: 10,
                        zIndex: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: colors.text
                            }}>Dodaj do koszyka</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialCommunityIcons name={'close-circle-outline'} size={30} style={{marginLeft: 3}} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 100,
                            backgroundColor: colors.background,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 40
                        }}>
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
                                onChangeText={(value) => value == '' ? setNumber(0) : setNumber(parseInt(value))}
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
                        <TouchableOpacity style={{
                            width: '40%',
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: colors.background
                            }}>{price}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </Modal>
        <View style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 20,
            width: windowWidth, 
            height: 60, 
            justifyContent: 'space-between',
            paddingHorizontal: windowWidth*0.05
        }}>
            <View style={{
                width: '38%',
                height: '100%',
                backgroundColor: colors.grey_l,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: colors.text,  
                    fontSize: 22
                }}>{item.price} zł</Text>
            </View>
            <TouchableOpacity 
                onPress={() => setModalVisible(true)}
                style={{ 
                    width: '58%',
                    height: '100%',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    borderRadius: 10,
                    backgroundColor: colors.primary
                }}>
                <Text style={{
                    color: colors.background, 
                    fontWeight: 'bold', 
                    fontSize: 18
                }}>Dodaj do koszyka</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity 
            style={{
                position: 'absolute',
                top: 320,
                right: 30,
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
            <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={25} style={{marginLeft: 3}} color={liked ? colors.primary : colors.text} />
        </TouchableOpacity>
        

        <Image 
            source={item.img} 
            resizeMode='contain' 
            style={{width: '60%', height: 300, marginLeft: '20%'}} 
        />
        <Text style={{
            color: colors.text,
            fontSize: 26,
            fontWeight: 'bold'
        }}>{item.name}</Text>
        <Text style={{
            color: colors.grey_d,
            fontSize: 18,
            marginTop: 5,
        }}>{item.amount} tabletek</Text>
        <View style={{
            marginTop: 20,
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
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
        }}>Opis</Text>
        <Text style={{
            color: colors.grey_d,
            fontSize: 18,
            marginTop: 5,
        }}>{item.desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '5%'
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
