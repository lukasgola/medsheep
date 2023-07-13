import React, { useState } from 'react';
import { View, Modal, KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '../theme/ThemeProvider';

const Amounter = (props) => {

    const {colors} = useTheme();

    const [number, setNumber] = useState(1)

    const goUp = () => {
        setNumber(number+1);
        props.goUp(number+1);
    }

    const goDown = () => {
        number == 0 ? console.log('You can not') : [setNumber(number-1), props.goDown(number-1)]
    }

  return (
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
            onChangeText={(value) => value == '' ? [setNumber(0), props.onChangeText(0)] : [setNumber(parseInt(value)), props.onChangeText(value)]}
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
  );
}

export default Amounter;