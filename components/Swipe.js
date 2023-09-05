import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable';

import styles from '../styles/styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../theme/ThemeProvider';

const Swipe = (props) => {

    const { colors } = useTheme();

    const [ index, setIndex ] = useState(props.index)

    const renderRightActions = (progress, dragX) => {
        return (
          <View style={{
            flexDirection: 'row',
            width: 100
          }}>
            <TouchableOpacity
            onPress={() => props.settingsClick()}
            style={{
              justifyContent: 'center',
              width: '50%',
              height: props.style.height,
            }}
          >
            <Ionicons name={'settings-outline'} size={25} color={colors.grey_d} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.trashClick()}
            style={{
              justifyContent: 'center',
              width: '50%',
              height: props.style.height,
            }}
          >
            <Ionicons name={'trash-outline'} size={25} color={colors.primary} />
          </TouchableOpacity>
          </View>
          
        );
      };

    
    return (
        <Swipeable
            renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX)
            }
            onSwipeableWillOpen={() => props.closeRow(index)}
            ref={(ref) => (props.row[index] = ref)}
            rightOpenValue={-100}
            containerStyle={[styles.shadow, {
                paddingBottom: 10
            }]}
        >
          <View style={props.style}>
            {props.children}
          </View>
        </Swipeable>
        
    )

}

export default Swipe;