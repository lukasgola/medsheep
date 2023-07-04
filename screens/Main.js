import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';


import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Main() {

  const DATA = [
    {
      id: 1,
      title: 'Kalendarz'
    },
    {
      id: 2,
      title: 'Kalendarz'
    },
    {
      id: 3,
      title: 'Kalendarz'
    },
    {
      id: 4,
      title: 'Kalendarz'
    }
  ]

  const { colors } = useTheme();


  const Item = ({item}) => {
    return(
      <TouchableOpacity style={{
        width: 180,
        height: 180,
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
      }}>
        <Text style={{color: colors.background, fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
