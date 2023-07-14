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

export default CartItem;