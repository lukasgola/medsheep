import { StyleSheet, Text, View } from 'react-native';

export default function Doctor() {
  return (
    <View style={styles.container}>
        <Text>Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
