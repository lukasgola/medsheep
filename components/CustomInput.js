import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {Controller} from 'react-hook-form';


import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../theme/ThemeProvider'


const CustomInput = ({
  defaultValue,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  size,
  color,
  icon,
  keyboardType,
  multiline
}) => {

  const {colors} = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: color,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              //justifyContent: 'center',
              borderColor: error ? 'red' : '#e8e8e8',
              borderWidth: 1
            }}
          >
            <View
              style={{
                width: 40,
                paddingLeft: 10,
                //alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Ionicons name={icon} size={size+4} color={colors.grey_d}/>
            </View>
              

              <TextInput

                style={{
                  width: '90%',
                  height: '100%',
                  fontSize: size,
                  color: colors.text,
                  paddingRight: 20
                }}
                value={value}
                defaultValue={defaultValue}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={colors.grey_d}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
                autoCapitalize={"none"}
                selectionColor={colors.primary}
              />
          </View>
          {error && (
            <View style={{width: '100%'}}>
              <Text>{error.message || 'Error'}</Text>
            </View>
            
          )}
        </>
      )}
    />
  );
};

export default CustomInput;