"use client"

import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AuthProvider } from "./src/context/AuthContext"
import { ThemeProvider } from "./src/context/ThemeContext"
import RootNavigator from "./src/navigation/RootNavigator"

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
