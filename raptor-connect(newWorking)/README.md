# RaptorConnect - Anderson High School Mobile App

A modern, iOS-inspired mobile app for Anderson High School students to stay updated on school announcements, events, clubs, and news.

## Features

- **Google Authentication**: Secure login with school email accounts
- **Announcements Feed**: Stay updated with the latest school announcements
- **Smart Calendar**: View and manage school events
- **Clubs Directory**: Discover and follow school clubs
- **Raptor Report**: Read the latest school news articles
- **Dark Mode Support**: Automatically adapts to system preferences or manual toggle
- **User Profiles**: Personalized experience with grade information and followed clubs

## Tech Stack

- React Native with Expo
- TypeScript
- Upstash Redis for data storage
- Google Authentication
- React Navigation for routing
- React Native Animatable for animations

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     \`\`\`
     UPSTASH_REDIS_REST_URL=your_upstash_redis_url
     UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
     EXPO_CLIENT_ID=your_google_expo_client_id
     IOS_CLIENT_ID=your_google_ios_client_id
     ANDROID_CLIENT_ID=your_google_android_client_id
     WEB_CLIENT_ID=your_google_web_client_id
     \`\`\`

### Running the App

\`\`\`
npx expo start
\`\`\`

This will start the Expo development server. You can run the app on:
- iOS simulator (requires macOS and Xcode)
- Android emulator (requires Android Studio)
- Physical device using the Expo Go app

## Project Structure

- `/assets` - Images, fonts, and other static assets
- `/src` - Source code
  - `/components` - Reusable UI components
  - `/context` - React Context providers (Auth, Theme)
  - `/navigation` - Navigation configuration
  - `/screens` - App screens
  - `/services` - API and database services

## Customization

- Theme colors can be modified in `src/context/ThemeContext.tsx`
- School-specific information can be updated in the mock data files

## License

This project is licensed under the MIT License.
