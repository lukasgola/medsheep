import React from 'react';
import { View, Modal } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

const BottomSheet = (props) => {

    const {colors} = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
    >
      <View style={{
          flex: 1,
          backgroundColor: 'black',
          opacity: 0.3
      }}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={props.visible}
          >
              <View
                  style={{
                      width: '100%',
                      backgroundColor: colors.background,
                      position: 'absolute',
                      bottom: 0,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      paddingHorizontal: '5%',
                      paddingVertical: 10,
                      zIndex: 10
              }}>
                  {props.children}
              </View>
          </Modal>
      </View>
  </Modal>
  );
}

export default BottomSheet;