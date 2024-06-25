import React, { useState, useEffect } from 'react';
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
        justifyContent: 'space-between',
      }}>
        <Image 
          source={{uri: props.item.img}} 
          resizeMode='contain' 
          style={{
            width: 50,
            height: 50
          }}
        />
          <View style={{
            flex: 1,
            paddingLeft: 10
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              fontWeight: 'bold',
            }}>{props.name ? props.name : props.item.name}</Text>
          </View>

        <View>
          <Text style={{
              fontSize: 14,
              color: colors.text,
          }}>{props.pillNumber ? props.pillNumber + ' ' + props.item.unit + '.' : 0  + ' ' + props.item.unit + '.'}</Text>
        </View>
        
        
      </View>
    )
  }

export default CartItem;