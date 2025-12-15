# Chore Check-in App

A cross-platform mobile application built with React Native and Expo that helps families manage household chores with a simple photo-based completion workflow.

## Features

### Family Management
- **Family Registration**: Create and set up family groups with multiple members
- **Role-based Access**: Separate interfaces for parents and children
- **Member Profiles**: View family member information and statistics

### Chore Assignment (Parents)
- **Create Chores**: Assign tasks to children with detailed descriptions
- **Due Date Management**: Set optional due dates for chores
- **Assignment Tracking**: Monitor all assigned chores and their status

### Chore Completion (Children)
- **Photo Verification**: Take photos to prove chore completion
- **Easy Submission**: Simple workflow to submit completed chores
- **Status Tracking**: View personal chore statistics and progress

### Approval Workflow (Parents)
- **Review System**: Examine completion photos and approve/reject chores
- **Quick Actions**: One-tap approval or rejection with feedback
- **Status Management**: Track completion and approval history

### User Experience
- **Dashboard**: Quick overview of pending, completed, and approved chores
- **Filtering**: Filter chores by status (All, Pending, Completed, Approved)
- **Overdue Indicators**: Visual alerts for overdue chores
- **Local Storage**: All data persisted locally using AsyncStorage

## Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Camera**: expo-image-picker
- **Icons**: @expo/vector-icons
- **Date Picker**: @react-native-community/datetimepicker

## Installation

1. **Prerequisites**
   ```bash
   # Install Node.js (v16 or later)
   # Install Expo CLI
   npm install -g @expo/cli
   ```

2. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd chore-checkin
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run on Device/Simulator**
   - **iOS**: `npm run ios` (requires macOS and Xcode)
   - **Android**: `npm run android` (requires Android Studio)
   - **Web**: `npm run web`
   - **Mobile**: Install Expo Go app and scan QR code

## App Workflow

### 1. Initial Setup
1. Open the app and enter your name and email
2. Select your role (Parent or Child)
3. Create your family and add family members
4. Start managing chores!

### 2. For Parents
1. **Create Chores**: Tap the "+" button to create new chores
2. **Assign Tasks**: Select which child should complete the chore
3. **Set Due Dates**: Optionally set when the chore should be completed
4. **Review Completions**: Approve or reject completed chores with photos

### 3. For Children
1. **View Assigned Chores**: See all chores assigned to you
2. **Complete Chores**: Take a photo showing the completed work
3. **Submit for Approval**: Send the completion to your parent
4. **Track Progress**: Monitor your completion statistics

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx   # Main app navigation
├── context/            # State management
│   └── AppContext.tsx  # Global app state
├── screens/            # App screens
│   ├── WelcomeScreen.tsx
│   ├── FamilySetupScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ChoresScreen.tsx
│   ├── ChoreDetailScreen.tsx
│   ├── ChoreCompletionScreen.tsx
│   ├── CreateChoreScreen.tsx
│   ├── FamilyScreen.tsx
│   └── ProfileScreen.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Helper functions
    └── helpers.ts
```

## Development

### Running Tests
```bash
npm test  # Currently no tests configured
```

### Building for Production
```bash
# Build for app stores
expo build:ios
expo build:android

# Create development build
expo export
```

### Adding New Features
1. Create new screen components in `src/screens/`
2. Add navigation routes in `src/components/Navigation.tsx`
3. Update types in `src/types/index.ts`
4. Add state management in `src/context/AppContext.tsx`

## Future Enhancements

- **Push Notifications**: Real-time alerts for new chores and approvals
- **Cloud Sync**: Multi-device synchronization with backend API
- **Reward System**: Points and achievements for completed chores
- **Recurring Chores**: Automatic chore scheduling
- **Photo Gallery**: History of all completion photos
- **Family Chat**: Communication features between family members
- **Chore Templates**: Pre-defined common household tasks

## Support

For issues and feature requests, please create an issue in the repository.

## License

This project is licensed under the MIT License.
