import { StyleSheet, Text, View, Image } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

export default function Patient() {


  const {colors} = useTheme();

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: '5%'
    }}>
        <View
          style={[styles.shadow,{
            width: '100%',
            height: 200,
            backgroundColor: colors.background,
            borderRadius: 20,
            marginTop: 20
          }]}
        >
          <Image 
            source={require('../assets/user_img.jpeg')} 
            resizeMode='contain'
            style={{
              width: 100,
              height: 100
            }}
          />
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
});