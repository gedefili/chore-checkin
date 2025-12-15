import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, User } from '../types';
import { useApp } from '../context/AppContext';
import { generateId } from '../utils/helpers';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { setCurrentUser } = useApp();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isParent, setIsParent] = useState(true);

  const handleContinue = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const user: User = {
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: isParent ? 'parent' : 'child',
      familyId: '', // Will be set during family setup
    };

    setCurrentUser(user);
    navigation.navigate('FamilySetup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="checkmark-circle" size={80} color="#007AFF" />
            <Text style={styles.title}>Chore Check-in</Text>
            <Text style={styles.subtitle}>
              Make family chores fun and organized!
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              autoCapitalize="words"
              autoCorrect={false}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>I am a...</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[styles.roleButton, isParent && styles.roleButtonActive]}
                onPress={() => setIsParent(true)}
              >
                <Ionicons
                  name="person"
                  size={24}
                  color={isParent ? '#fff' : '#007AFF'}
                />
                <Text style={[styles.roleText, isParent && styles.roleTextActive]}>
                  Parent
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleButton, !isParent && styles.roleButtonActive]}
                onPress={() => setIsParent(false)}
              >
                <Ionicons
                  name="happy"
                  size={24}
                  color={!isParent ? '#fff' : '#007AFF'}
                />
                <Text style={[styles.roleText, !isParent && styles.roleTextActive]}>
                  Child
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  roleButtonActive: {
    backgroundColor: '#007AFF',
  },
  roleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  roleTextActive: {
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
