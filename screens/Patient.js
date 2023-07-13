import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

export default function Patient() {


  const {colors} = useTheme();


  const CartItem = ({item}) => {
    return(
      <View style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
      }}>
        <Image 
          source={require('../assets/med/apap_noc.jpg')} 
          resizeMode='contain' 
          style={{
            width: 50,
            height: 50
          }}
        />
        <View style={{
          paddingLeft: 10,
          width: 90,
        }}>
          <Text style={{
            fontSize: 14,
            color: colors.text,
            fontWeight: 'bold'
          }}>Apap Noc</Text>
          <Text style={{
            fontSize: 14,
            color: colors.text
          }}>30 tab.</Text>
        </View>
        <Text style={{
            fontSize: 14,
            color: colors.text,
            marginLeft: '10%',
        }}>x2</Text>
        <Text style={{
            fontSize: 14,
            color: colors.text,
            marginLeft: '15%'
        }}>25.98 zł</Text>
      </View>
    )
  }


  const OrderItem = ({item}) => {
    return(
      <View style={{
        width: '100%',
        backgroundColor: colors.grey_l,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 10
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          marginBottom: 5,
        }}>
          <View style={{
            width: 6,
            height: 6,
            backgroundColor: colors.primary,
            borderRadius: 3
          }}></View>
          <Text style={{
            fontSize: 16,
            color: colors.text,
            fontWeight: 'bold',
            marginLeft: 5
          }}>12.06.2023</Text>
        </View>
        <CartItem />
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: '5%'
    }}>
        <View
          style={[styles.block,{
            backgroundColor: colors.background,
            flexDirection: 'row',
            padding: 15,
          }]}
        >
          <Image 
            source={require('../assets/user_img.jpeg')} 
            resizeMode='contain'
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
          <View>
            <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>Jan Kowalski</Text>
            <Text style={{
              fontSize: 14,
              color: colors.grey_d,
              marginLeft: 20,
              marginTop: 5
            }}>12.06.1971 (52 lata)</Text>
            <Text style={{
              fontSize: 14,
              color: colors.grey_d,
              marginLeft: 20,
              marginTop: 5
            }}>178 cm</Text>
            <Text style={{
              fontSize: 14,
              color: colors.grey_d,
              marginLeft: 20,
              marginTop: 5
            }}>85 kg</Text>
          </View>
        </View>
        
        <View style={[styles.block,{
          backgroundColor: colors.background,
        }]}>
          <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginTop: 15,
              marginBottom: 10
          }}>Koszyk</Text>

          <CartItem />

          <View style={{
            width: '100%',
            marginTop: 10,
            borderTopColor: colors.grey,
            borderTopWidth: 1,
            alignItems: 'flex-end',
            padding: 5
          }}>
            <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginTop: 5
            }}>25.98 zł</Text>
          </View>

          <TouchableOpacity style={styles.viewMore}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              fontWeight: 'bold',
            }}>Zobacz więcej...</Text>
          </TouchableOpacity>
        </View>


        <View style={[styles.block,{
          backgroundColor: colors.background,
        }]}>
          <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginTop: 15
          }}>Ostatnie zamówienia</Text>
            <OrderItem />
            <OrderItem />
          <TouchableOpacity style={styles.viewMore}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              fontWeight: 'bold',
            }}>Zobacz więcej...</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  block: {
    width: '100%',
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewMore:{
    width: '50%',
    alignItems: 'flex-end',
    marginLeft: '50%',
    marginVertical: 10,
  }
});