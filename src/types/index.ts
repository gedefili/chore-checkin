export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  familyId: string;
  avatar?: string;
}

export interface Family {
  id: string;
  name: string;
  members: User[];
  createdBy: string;
  createdAt: Date;
}

export interface Chore {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // User ID
  assignedBy: string; // User ID (parent)
  familyId: string;
  dueDate?: Date;
  status: 'pending' | 'completed' | 'verified' | 'approved';
  completedAt?: Date;
  completedPhoto?: string;
  approvedAt?: Date;
  approvedBy?: string; // User ID (parent)
  createdAt: Date;
}

export interface ChoreCompletion {
  choreId: string;
  photo?: string;
  completedBy: string;
  completedAt: Date;
  notes?: string;
}

export interface AppState {
  currentUser: User | null;
  family: Family | null;
  chores: Chore[];
  isLoading: boolean;
}

export type RootStackParamList = {
  Welcome: undefined;
  FamilySetup: undefined;
  Main: undefined;
  ChoreDetail: { choreId: string };
  ChoreCompletion: { choreId: string };
  CreateChore: undefined;
  Camera: { choreId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Chores: undefined;
  Family: undefined;
  Profile: undefined;
};
