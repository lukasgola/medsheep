import React from 'react';
import { View, Modal, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: colors.text,
                        }}>{props.text}</Text>
                        <TouchableOpacity onPress={() => props.setModalVisible(false)}>
                            <MaterialCommunityIcons name={'close-circle-outline'} size={30} style={{marginLeft: 3}} color={colors.text} />
                        </TouchableOpacity>
                    </View>
                  {props.children}
              </KeyboardAvoidingView>
          </Modal>
      </View>
  </Modal>
  );
}

export default BottomSheet;