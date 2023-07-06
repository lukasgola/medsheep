import { StyleSheet, Text, View } from 'react-native';

export default function Results() {
  return (
    <View style={styles.container}>
        <Text>Results</Text>
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
