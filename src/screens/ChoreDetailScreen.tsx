import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChoreDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChoreDetailScreen - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  text: { fontSize: 18, color: '#666' },
});
