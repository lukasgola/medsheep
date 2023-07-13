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
          style={[styles.block,{
            backgroundColor: colors.background,
            flexDirection: 'row',
          }]}
        >
          <Image 
            source={require('../assets/user_img.jpeg')} 
            resizeMode='contain'
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
          <View>
            <Text style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>Jan Kowalski</Text>
            <Text style={{
              fontSize: 14,
              color: colors.grey_d,
              marginLeft: 20,
              marginTop: 5
            }}>12.06.1971 (52 lata)</Text>
            <Text style={{
              fontSize: 14,
              color: colors.grey_d,
              marginLeft: 20,
              marginTop: 5
            }}>178 cm</Text>
            <Text style={{
              fontSize: 14,
              color: colors.grey_d,
              marginLeft: 20,
              marginTop: 5
            }}>85 kg</Text>
          </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  block: {
    width: '100%',
    borderRadius: 20,
    marginTop: 20,
    padding: 15,
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