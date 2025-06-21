# GRF - React Native TypeScript App

A modern React Native application built with TypeScript, Expo Router for file-based routing, multi-language support (Arabic & English), and API integration.

## 📱 Features

- **File-Based Routing**: Using Expo Router for intuitive navigation
- **TypeScript**: Full type safety and better development experience
- **Multi-language Support**: Seamless switching between Arabic (RTL) and English (LTR)
- **API Integration**: Ready-to-use API service with type-safe requests
- **Persistent Settings**: Language preference and app state saved locally
- **Modern Architecture**: Context API, custom hooks, and clean component structure
- **Tab Navigation**: Bottom tab navigation with icons
- **Production Ready**: Optimized build configurations for both platforms

## 🏗️ Architecture

### Project Structure
```
GRF/
├── app/                    # File-based routing (Expo Router)
│   ├── (tabs)/            # Tab navigation group
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Home screen
│   │   ├── profile.tsx    # Profile screen
│   │   └── settings.tsx   # Settings screen
│   └── _layout.tsx        # Root layout
├── contexts/              # React Context providers
│   ├── LanguageContext.tsx
│   └── ApiContext.tsx
├── hooks/                 # Custom React hooks
│   ├── useLanguage.ts
│   └── useApi.ts
├── constants/             # App constants
│   ├── translations.ts
│   └── api.ts
├── types/                 # TypeScript type definitions
│   └── api.ts
├── package.json
├── app.json              # Expo configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
```

### Core Architecture Patterns

#### **File-Based Routing with Expo Router**
```
app/
├── _layout.tsx          # Root layout with providers
├── (tabs)/             # Tab group
│   ├── _layout.tsx     # Tab navigation setup
│   ├── index.tsx       # Home tab (/)
│   ├── profile.tsx     # Profile tab (/profile)
│   └── settings.tsx    # Settings tab (/settings)
└── modal.tsx           # Modal screen (/modal)
```

#### **Context Architecture**
- **LanguageContext**: Manages app language state and translations
- **ApiContext**: Handles API calls, loading states, and error management
- **Providers**: Wrapped at root level for global access

#### **Type-Safe API Integration**
```typescript
interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const data = await fetchData<ApiResponse>('/posts/1');
```

#### **Custom Hooks Pattern**
- **useLanguage**: Language switching and translations
- **useApi**: API calls with loading and error states
- **Reusable Logic**: Extracted for component reuse

### Component Architecture

#### **Functional Components with TypeScript**
```typescript
interface Props {
  title: string;
  onPress: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  // Component logic
};
```

#### **State Management Hierarchy**
1. **Global State**: Context API for app-wide state
2. **Local State**: useState for component-specific state
3. **Persistent State**: AsyncStorage for user preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Create new Expo project with TypeScript**
```bash
npx create-expo-app GRF --template tabs --typescript
cd GRF
```

2. **Install additional dependencies**
```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-router
npx expo install react-native-safe-area-context react-native-screens
```

3. **Replace files with provided code**
- Copy all the provided TypeScript files
- Update `package.json` with the new dependencies
- Replace `app.json` with Expo configuration

### Running the Application

#### Development Mode
```bash
# Start Expo development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Run on web browser
npx expo start --web
```

#### Production Build
```bash
# Install EAS CLI
npm install -g eas-cli

# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios

# Build for both platforms
npx expo build:all
```

## 🌐 API Integration

### Current Setup
The app uses JSONPlaceholder API for demonstration:
- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Type Safety**: Full TypeScript interfaces for API responses
- **Error Handling**: Centralized error management

### Customizing API

1. **Update API Configuration**
```typescript
// constants/api.ts
export const ApiConfig = {
  baseURL: 'https://your-api-domain.com/api/v1',
  timeout: 10000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};
```

2. **Add Authentication**
```typescript
// contexts/ApiContext.tsx
const fetchData = async <T,>(endpoint: string, token?: string): Promise<T> => {
  const headers = {
    ...defaultHeaders,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  // ... rest of implementation
};
```

3. **Environment-Specific Configuration**
```typescript
// constants/api.ts
export const EnvironmentConfig = {
  development: { baseURL: 'https://dev-api.grf.com' },
  production: { baseURL: 'https://api.grf.com' },
};
```

## 🌍 Internationalization (i18n)

### Current Languages
- **English (en)**: Default language
- **Arabic (ar)**: RTL support included

### Type-Safe Translations
```typescript
export type TranslationKey = keyof typeof translations.en;

const t = (key: TranslationKey): string => {
  return translations[currentLanguage][key] || key;
};
```

### Adding New Languages

1. **Extend Translation Types**
```typescript
export type Language = 'en' | 'ar' | 'fr';

export const translations = {
  en: { /* existing */ },
  ar: { /* existing */ },
  fr: {
    welcome: 'Bienvenue dans GRF',
    // ... other translations
  },
};
```

2. **Update Language Hook**
```typescript
const changeLanguage = async (): Promise<void> => {
  const languages: Language[] = ['en', 'ar', 'fr'];
  const currentIndex = languages.indexOf(currentLanguage);
  const nextLanguage = languages[(currentIndex + 1) % languages.length];
  // ... rest of logic
};
```

## 📱 Navigation Structure

### File-Based Routing
```
Routes:
├── /              # Home screen (app/(tabs)/index.tsx)
├── /profile       # Profile screen (app/(tabs)/profile.tsx)
├── /settings      # Settings screen (app/(tabs)/settings.tsx)
└── /modal         # Modal screen (app/modal.tsx)
```

### Tab Navigation
- **Home**: Main screen with API integration demo
- **Profile**: User profile with account settings
- **Settings**: App preferences and configuration

### Navigation Features
- **Type-Safe Navigation**: TypeScript route definitions
- **Deep Linking**: URL-based navigation support
- **Modal Presentation**: Stack-based modal screens

## 🔧 TypeScript Configuration

### Strict Type Checking
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  }
}
```

### Path Mapping
```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./*"],
    "@/components/*": ["./components/*"],
    "@/hooks/*": ["./hooks/*"]
  }
}
```

## 🧪 Testing

```bash
# Run TypeScript type checking
npm run type-check

# Run tests
npm test

# Run linting
npm run lint
```

## 📦 Building for Distribution

### Using EAS Build (Recommended)
```bash
# Configure EAS
eas build:configure

# Build for production
eas build --platform all

# Submit to app stores
eas submit
```

### Local Builds
```bash
# Build APK locally
npx expo run:android --variant release

# Build for iOS
npx expo run:ios --configuration Release
```

## 🔮 Advanced Features

### Custom Hooks
```typescript
// hooks/useApi.ts - Type-safe API calls
const { data, loading, error } = useApi<User[]>('/users');

// hooks/useLanguage.ts - Language management
const { t, currentLanguage, changeLanguage } = useLanguage();
```

### Context Providers
```typescript
// Global state management
<LanguageProvider>
  <ApiProvider>
    <App />
  </ApiProvider>
</LanguageProvider>
```

### Type-Safe Navigation
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/profile'); // Type-checked routes
```

## 🚀 Deployment

### Expo Application Services (EAS)
1. **Setup EAS Account**: `eas login`
2. **Configure Build**: `eas build:configure`
3. **Build App**: `eas build --platform all`
4. **Submit to Stores**: `eas submit`

### Manual Store Submission
1. **Generate Build**: Follow platform-specific build steps
2. **App Store Connect**: Upload iOS build
3. **Google Play Console**: Upload Android build

## 🤝 Contributing

### Development Workflow
1. **Type Safety**: Ensure all new code has proper TypeScript types
2. **Testing**: Add tests for new features
3. **Localization**: Add translations for new text
4. **Code Style**: Follow existing patterns and ESLint rules

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Consistent code formatting
- **Prettier**: Automatic code formatting

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React Native, TypeScript, and Expo Router

2. **Install dependencies**
```bash
npm install
```

3. **Install iOS dependencies** (iOS only)
```bash
cd ios && pod install && cd ..
```

### Running the Application

#### Development Mode
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

#### Production Build
```bash
# Android APK
npm run build:android

# iOS Release
npm run build:ios
```

## 🌐 API Integration

### Current Setup
The app uses JSONPlaceholder API for demonstration:
- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Sample Endpoint**: `/posts/1`

### Customizing API

1. **Update Base URL**
```javascript
const apiService = {
  baseURL: 'https://your-api-domain.com/api/v1',
  // ... rest of the service
};
```

2. **Add Authentication**
```javascript
async get(endpoint, token) {
  const response = await fetch(`${this.baseURL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  // ... rest of the method
}
```

3. **Environment Configuration**
Create environment-specific configs:
```javascript
const config = {
  development: {
    baseURL: 'https://dev-api.yourapp.com',
  },
  production: {
    baseURL: 'https://api.yourapp.com',
  },
};
```

## 🌍 Internationalization (i18n)

### Current Languages
- **English (en)**: Default language
- **Arabic (ar)**: RTL support included

### Adding New Languages

1. **Add translations**
```javascript
const translations = {
  en: { /* existing */ },
  ar: { /* existing */ },
  fr: {
    welcome: 'Bienvenue dans MyApp',
    // ... other translations
  },
};
```

2. **Update language switching logic**
```javascript
const changeLanguage = async () => {
  const languages = ['en', 'ar', 'fr'];
  const currentIndex = languages.indexOf(currentLanguage);
  const nextLanguage = languages[(currentIndex + 1) % languages.length];
  // ... rest of the logic
};
```

### RTL Support
The app automatically handles RTL layout for Arabic:
- Text alignment changes to right
- Layout direction switches to RTL
- Proper text rendering for Arabic script

## 📦 Building for Distribution

### Android

1. **Generate signed APK**
```bash
cd android
./gradlew assembleRelease
```

2. **APK location**: `android/app/build/outputs/apk/release/app-release.apk`

### iOS

1. **Archive in Xcode**
   - Open `ios/MyMultiLangApp.xcworkspace`
   - Product → Archive
   - Distribute App

## 🔧 Customization

### Styling
- All styles are in `StyleSheet.create()` objects
- Easy to customize colors, fonts, and layouts
- Responsive design patterns included

### Adding New Features
1. Create new components in separate files
2. Import and use in `App.js`
3. Follow the existing patterns for state management

### Environment Variables
For sensitive data like API keys:
1. Install `react-native-config`
2. Create `.env` files
3. Access via `Config.API_KEY`

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 🚀 Deployment

### Play Store (Android)
1. Build signed APK/AAB
2. Upload to Google Play Console
3. Follow Play Store guidelines

### App Store (iOS)
1. Archive in Xcode
2. Upload to App Store Connect
3. Submit for review

## 📱 App Features Walkthrough

1. **Home Screen**: Displays welcome message in current language
2. **Language Toggle**: Button to switch between Arabic and English
3. **API Demo**: Button to fetch sample data from API
4. **Data Display**: Shows fetched data with proper formatting
5. **Loading States**: Visual feedback during API calls
6. **Error Handling**: User-friendly error messages

## 🔮 Future Enhancements

- **Navigation**: Add React Navigation for multiple screens
- **State Management**: Implement Redux or Context API for complex state
- **Offline Support**: Add offline data caching
- **Push Notifications**: Firebase Cloud Messaging integration
- **Analytics**: User behavior tracking
- **Testing**: Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check existing documentation
- Review React Native official docs

---

Built with ❤️ using React Native