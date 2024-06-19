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
      }}>
        <Image 
          source={props.item.img} 
          resizeMode='contain' 
          style={{
            width: 50,
            height: 50
          }}
        />
        {!props.pillNumber ? 
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{
            paddingLeft: 10,
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              fontWeight: 'bold',
            }}>{props.item ? props.item.name : 'None'}</Text>
          </View>
          <View style={{
            paddingLeft: '45%',
            justifyContent:'space-between',
            flexDirection: 'row',
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              marginLeft: '10%',

          }}>x{props.number ? props.number : 0 }</Text>
          </View>
        </View>
        : 
        <View style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{
            paddingLeft: 10,
            //width: '70%',
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.text,
              fontWeight: 'bold',
            }}>{props.item ? props.item.name : 'None'}</Text>
          </View>
          <Text style={{
              fontSize: 14,
              color: colors.text,
          }}>{props.pillNumber ? props.pillNumber : 0 } tab.</Text>
        </View>
        }
        
        
      </View>
    )
  }

export default CartItem;