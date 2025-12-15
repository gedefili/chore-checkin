import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, User, Family, Chore } from '../types';

interface AppContextType extends AppState {
  setCurrentUser: (user: User | null) => void;
  setFamily: (family: Family | null) => void;
  addChore: (chore: Chore) => void;
  updateChore: (choreId: string, updates: Partial<Chore>) => void;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_FAMILY'; payload: Family | null }
  | { type: 'ADD_CHORE'; payload: Chore }
  | { type: 'UPDATE_CHORE'; payload: { id: string; updates: Partial<Chore> } }
  | { type: 'SET_CHORES'; payload: Chore[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  currentUser: null,
  family: null,
  chores: [],
  isLoading: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_FAMILY':
      return { ...state, family: action.payload };
    case 'ADD_CHORE':
      return { ...state, chores: [...state.chores, action.payload] };
    case 'UPDATE_CHORE':
      return {
        ...state,
        chores: state.chores.map(chore =>
          chore.id === action.payload.id
            ? { ...chore, ...action.payload.updates }
            : chore
        ),
      };
    case 'SET_CHORES':
      return { ...state, chores: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from storage on app start
  useEffect(() => {
    loadStoredData();
  }, []);

  // Save data whenever state changes
  useEffect(() => {
    saveToStorage();
  }, [state.currentUser, state.family, state.chores]);

  const loadStoredData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const [userStr, familyStr, choresStr] = await Promise.all([
        AsyncStorage.getItem('currentUser'),
        AsyncStorage.getItem('family'),
        AsyncStorage.getItem('chores'),
      ]);

      if (userStr) {
        dispatch({ type: 'SET_USER', payload: JSON.parse(userStr) });
      }
      if (familyStr) {
        dispatch({ type: 'SET_FAMILY', payload: JSON.parse(familyStr) });
      }
      if (choresStr) {
        dispatch({ type: 'SET_CHORES', payload: JSON.parse(choresStr) });
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveToStorage = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('currentUser', JSON.stringify(state.currentUser)),
        AsyncStorage.setItem('family', JSON.stringify(state.family)),
        AsyncStorage.setItem('chores', JSON.stringify(state.chores)),
      ]);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  const setCurrentUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setFamily = (family: Family | null) => {
    dispatch({ type: 'SET_FAMILY', payload: family });
  };

  const addChore = (chore: Chore) => {
    dispatch({ type: 'ADD_CHORE', payload: chore });
  };

  const updateChore = (choreId: string, updates: Partial<Chore>) => {
    dispatch({ type: 'UPDATE_CHORE', payload: { id: choreId, updates } });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const contextValue: AppContextType = {
    ...state,
    setCurrentUser,
    setFamily,
    addChore,
    updateChore,
    setLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
