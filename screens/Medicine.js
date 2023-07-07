import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

export default function Medicine({route, navigation}) {

    const {item} = route.params;
    const {colors} = useTheme();

    const windowWidth = Dimensions.get('screen').width;

    const [liked, setLiked] = useState(false)



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
        <View style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 20,
            width: windowWidth, 
            height: 60, 
            justifyContent: 'space-between',
            paddingHorizontal: 10
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
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: colors.primary,
                        marginVertical: 5,
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
