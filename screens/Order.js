import { StyleSheet, Text, View } from 'react-native';

export default function Order() {
  return (
    <View style={styles.container}>
        <Text>Order</Text>
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