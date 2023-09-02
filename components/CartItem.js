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
        //justifyContent: 'space-between',
      }}>
        <Image 
          source={props.item.img} 
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
            fontWeight: 'bold',
          }}>{props.item ? props.item.name : 'None'}</Text>
          <Text style={{
            fontSize: 14,
            color: colors.text
          }}>{props.item ? props.item.amount : 'None'} tab.</Text>
        </View>
        <View style={{
          width: '55%',
          paddingLeft: '15%',
          justifyContent:'space-between',
          flexDirection: 'row',
        }}>
          <Text style={{
              fontSize: 14,
              color: colors.text,
          }}>x{props.number ? props.number : 0 }</Text>
          <Text style={{
            fontSize: 14,
            color: colors.text,
            marginLeft: '10%',

        }}>{props.price ? props.price : 0} zł</Text>
        </View>
        
        
      </View>
    )
  }

export default CartItem;