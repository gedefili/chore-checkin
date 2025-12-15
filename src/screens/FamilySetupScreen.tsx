import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, Family, User } from '../types';
import { useApp } from '../context/AppContext';
import { generateId } from '../utils/helpers';

type FamilySetupNavigationProp = StackNavigationProp<RootStackParamList, 'FamilySetup'>;

export default function FamilySetupScreen() {
  const navigation = useNavigation<FamilySetupNavigationProp>();
  const { currentUser, setCurrentUser, setFamily, addChore } = useApp();
  
  const [familyName, setFamilyName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState<'parent' | 'child'>('child');
  const [familyMembers, setFamilyMembers] = useState<User[]>([]);

  const addMember = () => {
    if (!memberName.trim() || !memberEmail.trim()) {
      Alert.alert('Error', 'Please fill in member details');
      return;
    }

    const newMember: User = {
      id: generateId(),
      name: memberName.trim(),
      email: memberEmail.trim().toLowerCase(),
      role: memberRole,
      familyId: '', // Will be set when family is created
    };

    setFamilyMembers([...familyMembers, newMember]);
    setMemberName('');
    setMemberEmail('');
    setMemberRole('child');
  };

  const removeMember = (memberId: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== memberId));
  };

  const createFamily = () => {
    if (!familyName.trim()) {
      Alert.alert('Error', 'Please enter a family name');
      return;
    }

    if (!currentUser) {
      Alert.alert('Error', 'No user found');
      return;
    }

    const familyId = generateId();
    
    // Update current user with family ID
    const updatedCurrentUser: User = {
      ...currentUser,
      familyId,
    };

    // Update all family members with family ID
    const updatedMembers = familyMembers.map(member => ({
      ...member,
      familyId,
    }));

    const family: Family = {
      id: familyId,
      name: familyName.trim(),
      members: [updatedCurrentUser, ...updatedMembers],
      createdBy: currentUser.id,
      createdAt: new Date(),
    };

    setCurrentUser(updatedCurrentUser);
    setFamily(family);

    // Add sample chores if this is a parent creating the family
    if (currentUser.role === 'parent' && updatedMembers.length > 0) {
      const sampleChores = [
        {
          id: generateId(),
          title: 'Clean your bedroom',
          description: 'Make your bed, put clothes away, and vacuum the floor.',
          assignedTo: updatedMembers[0].id,
          assignedBy: currentUser.id,
          familyId,
          status: 'pending' as const,
          createdAt: new Date(),
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        },
        {
          id: generateId(),
          title: 'Take out the trash',
          description: 'Empty all wastebaskets and take the trash bin to the curb.',
          assignedTo: updatedMembers[0].id,
          assignedBy: currentUser.id,
          familyId,
          status: 'pending' as const,
          createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        },
      ];

      // Add more sample chores if there are more children
      if (updatedMembers.length > 1) {
        sampleChores.push({
          id: generateId(),
          title: 'Wash the dishes',
          description: 'Wash, dry, and put away all dishes from the sink.',
          assignedTo: updatedMembers[1].id,
          assignedBy: currentUser.id,
          familyId,
          status: 'pending' as const,
          createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        });
      }

      // Add sample chores to context
      sampleChores.forEach(chore => addChore(chore));
    }
    
    Alert.alert(
      'Success!',
      `Welcome to ${family.name}! ${currentUser.role === 'parent' && updatedMembers.length > 0 ? 'Some sample chores have been added to get you started.' : 'You can now start managing chores.'}`,
      [{ text: 'OK', onPress: () => navigation.navigate('Main') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="home" size={60} color="#007AFF" />
            <Text style={styles.title}>Set up your family</Text>
            <Text style={styles.subtitle}>
              Create your family group and add members
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Family Name</Text>
            <TextInput
              style={styles.input}
              value={familyName}
              onChangeText={setFamilyName}
              placeholder="Enter your family name"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Family Members</Text>
            
            <View style={styles.memberForm}>
              <TextInput
                style={styles.input}
                value={memberName}
                onChangeText={setMemberName}
                placeholder="Member name"
                autoCapitalize="words"
              />
              
              <TextInput
                style={[styles.input, styles.inputSpacing]}
                value={memberEmail}
                onChangeText={setMemberEmail}
                placeholder="Member email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.roleSelector}>
                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    memberRole === 'parent' && styles.roleOptionActive
                  ]}
                  onPress={() => setMemberRole('parent')}
                >
                  <Text style={[
                    styles.roleOptionText,
                    memberRole === 'parent' && styles.roleOptionTextActive
                  ]}>
                    Parent
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    memberRole === 'child' && styles.roleOptionActive
                  ]}
                  onPress={() => setMemberRole('child')}
                >
                  <Text style={[
                    styles.roleOptionText,
                    memberRole === 'child' && styles.roleOptionTextActive
                  ]}>
                    Child
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={addMember}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Add Member</Text>
              </TouchableOpacity>
            </View>

            {familyMembers.length > 0 && (
              <View style={styles.membersList}>
                <Text style={styles.membersTitle}>Family Members:</Text>
                {familyMembers.map((member) => (
                  <View key={member.id} style={styles.memberItem}>
                    <View style={styles.memberInfo}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberDetails}>
                        {member.email} • {member.role}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeMember(member.id)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.createButton} onPress={createFamily}>
            <Text style={styles.createButtonText}>Create Family</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputSpacing: {
    marginTop: 12,
  },
  memberForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  roleSelector: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
  },
  roleOption: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  roleOptionActive: {
    backgroundColor: '#007AFF',
  },
  roleOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  roleOptionTextActive: {
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#34C759',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  membersList: {
    marginTop: 20,
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  memberDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  createButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
