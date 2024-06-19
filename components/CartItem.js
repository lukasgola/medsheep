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
        justifyContent: 'space-between',
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
            flex: 1,
            paddingLeft: 10
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              fontWeight: 'bold',
            }}>{props.item ? props.item.name : 'None'}</Text>
          </View>

        <View>
          <Text style={{
              fontSize: 14,
              color: colors.text,
          }}>{props.pillNumber ? props.pillNumber : 0 } tab.</Text>
        </View>
        
        
      </View>
    )
  }

export default CartItem;