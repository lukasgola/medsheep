import { useState } from 'react';

import { Image, Text, View, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Initial({navigation}) {

  const {colors} = useTheme();

  const width = Dimensions.get('screen').width;

  const [buttonText, setButtonText] = useState('Dalej');

  const leftValue = useState(new Animated.Value(1))[0];
  const rightValue = useState(new Animated.Value(0.2))[0];

  function fadeRight(){
      Animated.timing(leftValue,{
          toValue: 0.2,
          duration: 400,
          useNativeDriver: true
      }).start()
      Animated.timing(rightValue,{
        toValue: 1,
        duration: 400,
        useNativeDriver: true
    }).start()
  }

  function fadeLeft(){
    Animated.timing(leftValue,{
        toValue: 1,
        duration: 400,
        useNativeDriver: true
    }).start()
    Animated.timing(rightValue,{
        toValue: 0.2,
        duration: 400,
        useNativeDriver: true
    }).start()
  }

  const scrollToIndex = (value) => {
    this.flatListRef.scrollToIndex({animated: true, index: value});
    value == 1 ? [fadeRight(), setButtonText('Zaczynamy')] : [fadeLeft(), setButtonText('Dalej')]
  }


  const DATA = [
    {
      id: 0,
      title: 'Zaplanuj leczenie',
      desc: 'Zaplanuj cykl brania leku w kalendarzu i otrzymuj powiadomienia przypominajce',
      img: require('../assets/plan.png'),
    },
    {
      id: 1,
      title: 'Zamawiaj leki',
      desc: 'Zamawiaj leki prosto do domu',
      img: require('../assets/order.png'),
    },
  ]


  const InitialItem = ({item}) => {
    return(
      <View style={{
        width: width,
        padding: 25,
        //backgroundColor: 'green'
        //marginLeft: item.id == 1 ? 25 : 0,
      }}>
        <TouchableOpacity 
          onPress={() => scrollToIndex(0)}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: item.id == 0 ? 0 : rightValue,
            left: 20
        }}>
          <Ionicons name={'chevron-back-outline'} size={40} color={colors.text}/>
        </TouchableOpacity>
        <Image 
          style={{
            width: '100%',
            height: 400
          }}
          source={item.img} 
          resizeMode='contain' 
        />

          <Text style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: colors.text
          }}>
            {item.title}
          </Text>

          <Text style={{
            fontSize: 16,
            color: colors.grey_d,
            marginTop: 20,
          }}>
            {item.desc}
          </Text>
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 100,
    }}>

      <FlatList 
        data={DATA}
        renderItem={({item}) => <InitialItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { this.flatListRef = ref; }}
        scrollEnabled={false}
      />

        <View style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
        }}>
          
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{flexDirection:'row', width: 30, justifyContent: 'space-between', marginTop: 50}}>
              <Animated.View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: colors.text, opacity: leftValue}}>
              </Animated.View>
              <Animated.View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: colors.text, opacity: rightValue}}>
              </Animated.View>
            </View>
            <TouchableOpacity 
              onPress={() => buttonText == 'Dalej' ? scrollToIndex(1) : navigation.navigate('SignIn')}
              style={{
                width: '50%',
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primary,
                borderRadius: 10,
                marginTop: 30
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.background,
              }}>{buttonText}</Text>
            </TouchableOpacity>
            </View>
        </View>
        
    </View>
  );
}
