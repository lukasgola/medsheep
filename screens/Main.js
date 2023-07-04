import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

export default function Main() {

  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.primary }}>
        <Text>
            Hello!
        </Text>
    </View>
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
