import { Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';
import { useCurrentUser } from '../providers/CurrentUserProvider';

export default function Main({navigation}) {

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;

  const boxWidth = windowWidth*0.42

  const DATA = [
    {
      id: 1,
      title: 'Kalendarz',
      img: require('../assets/calendar2.png'),
      navigation: 'Kalendarz'
    },
    {
      id: 2,
      title: 'Lekarz',
      img: require('../assets/contact.png'),
      navigation: 'Lekarz'
    },
    {
      id: 3,
      title: 'Szukaj',
      img: require('../assets/search.png'),
      navigation: 'Szukaj'
    },
    {
      id: 4,
      title: 'Wyniki',
      img: require('../assets/results.png'),
      navigation: 'Wyniki'
    }
  ]

  const { colors } = useTheme();
  const { currentUser } = useCurrentUser();


  const Item = ({item}) => {
    return(
      <TouchableOpacity 
        style={{
          width: boxWidth,
          height: windowHeight/3.1,
          backgroundColor: colors.background,
          borderRadius: 20,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: boxWidth*0.05,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.13,
          shadowRadius: 2.62,
          elevation: 4,
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
          fontWeight: 'bold',
          fontSize: 16,
          color: colors.text,
          marginTop: 10
        }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        scrollEnabled={false}
        ListHeaderComponent={
          <View style={{
            marginHorizontal: boxWidth*0.05,
            marginTop: 20,
            marginBottom: 10
            
          }}>
            <View style={{flexDirection: 'row'}}>
              <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: colors.text
              }}>Witaj </Text>
              <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: colors.primary
              }}>{currentUser.name}</Text>
            </View>
            <Text
            style={{
              fontSize: 16,
              color: colors.text
            }}>Miło Cię znów widzieć!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}