import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

const CartItem = (props) => {

    const {colors} = useTheme();

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
          }}>{props.item ? props.item.name : 'None'}</Text>
          <Text style={{
            fontSize: 14,
            color: colors.text
          }}>{props.item ? props.item.amount : 'None'} tab.</Text>
        </View>
        <Text style={{
            fontSize: 14,
            color: colors.text,
            marginLeft: '10%',
        }}>x{props.number ? props.number : 0 }</Text>
        <Text style={{
            fontSize: 14,
            color: colors.text,
            marginLeft: '18%'
        }}>{props.price ? props.price : 0} zł</Text>
      </View>
    )
  }

export default CartItem;