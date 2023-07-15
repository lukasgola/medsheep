import React from 'react';
import { View, Modal, KeyboardAvoidingView, Text, TouchableOpacity, Touchable } from 'react-native';

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
          opacity: 0.3,
      }}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={props.visible}
              style={{
                alignItems: 'center'
              }}
          >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    width: '95%',
                    position: 'absolute',
                    left: '2.5%',
                    bottom: 20,
                    zIndex: 10
              }}>
                    <View style={{
                        backgroundColor: colors.background,
                        flex: 1,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        paddingHorizontal: '5%',
                        paddingVertical: 10,
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
                </View>
                <View
                    style={{
                        backgroundColor: colors.background,
                        width: '100%',
                        height: 60,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        borderTopWidth: 1,
                        borderTopColor: colors.grey_l
                    }}
                >
                    <TouchableOpacity 
                        activeOpacity={0.2}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: colors.primary
                        }}>Wybierz</Text>
                    </TouchableOpacity>
                </View>
                
                <View
                    style={{
                        backgroundColor: colors.background,
                        width: '100%',
                        height: 60,
                        borderRadius: 15,
                        marginTop: 5
                    }}
                >
                    <TouchableOpacity 
                        onPress={() => props.setModalVisible(false)}
                        activeOpacity={0.2}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: colors.primary,
                            fontWeight: 'bold'
                        }}>Anuluj</Text>
                    </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
          </Modal>
      </View>
  </Modal>
  );
}

export default BottomSheet;