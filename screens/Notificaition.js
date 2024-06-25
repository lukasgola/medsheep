import { Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

import PushNotifications from '../components/PushNotifications';

export default function Notifications({navigation}) {

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;

  const { colors } = useTheme();


  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <PushNotifications />
    </SafeAreaView>
  );
}