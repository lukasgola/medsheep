import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Pressable } from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../theme/ThemeProvider';

const Swipe = (props) => {

    const { colors } = useTheme();

    const [ index, setIndex ] = useState(props.index)

    const renderRightActions = (progress, dragX) => {
        return (
          <TouchableOpacity
            onPress={() => props.trashClick()}
            style={{
              justifyContent: 'center',
              width: 60,
              marginLeft: 10,
              height: props.style.height,
            }}
          >
            <Ionicons name={'trash-outline'} size={25} color={colors.primary} />
          </TouchableOpacity>
          
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
            containerStyle={[ {
                paddingBottom: 10
            }]}
        >
          <Pressable 
            onPress={() => props.onSettingsClick()}
            style={[{
              borderWidth: 1,
              borderColor: colors.grey
            },props.style]}
          >
            {props.children}
          </Pressable>
        </Swipeable>
        
    )

}

export default Swipe;