import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

export default function Main({navigation}) {

  const windowWidth = Dimensions.get('screen').width;

  const boxWidth = windowWidth*0.42

  const DATA = [
    {
      id: 1,
      title: 'Kalendarz',
      img: require('../assets/calendar.png'),
      navigation: 'Calendar'
    },
    {
      id: 2,
      title: 'Kontakt z lekarzem',
      img: require('../assets/contact.png'),
      navigation: 'Calendar'
    },
    {
      id: 3,
      title: 'Szukaj',
      img: require('../assets/search.png'),
      navigation: 'Calendar'
    },
    {
      id: 4,
      title: 'Wyniki',
      img: require('../assets/results.png'),
      navigation: 'Calendar'
    }
  ]

  const { colors } = useTheme();


  const Item = ({item}) => {
    return(
      <TouchableOpacity 
        style={{
          width: boxWidth,
          height: boxWidth,
          backgroundColor: colors.background,
          borderRadius: boxWidth/10,
          marginTop:20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: boxWidth*0.05
        }}
        onPress={() => navigation.navigate(item.navigation)}
      
      >
        <Image 
          source={item.img}
          style={{
            width: 120,
            height: 120
          }}  
        />
        <Text style={{
          color: colors.background,
          fontWeight: 'bold',
          fontSize: 16,
          color: '#000',
          marginTop: 10
        }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        scrollEnabled={false}
        style={{
          paddingTop: 100
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
