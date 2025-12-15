import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const { currentUser, family, chores } = useApp();
  const userChores = chores.filter(c => c.assignedTo === currentUser?.id || c.assignedBy === currentUser?.id);
  const pending = userChores.filter(c => c.status === 'pending').length;
  const completed = userChores.filter(c => c.status === 'completed').length;
  const approved = userChores.filter(c => c.status === 'approved').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>Hello, {currentUser?.name}! 👋</Text>
        <Text style={styles.familyName}>{family?.name} Family</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{approved}</Text>
            <Text style={styles.statLabel}>Approved</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20, paddingTop: 60 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  familyName: { fontSize: 16, color: '#666', marginTop: 4 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#eee' },
  statNumber: { fontSize: 28, fontWeight: 'bold', color: '#007AFF' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4 },
});
