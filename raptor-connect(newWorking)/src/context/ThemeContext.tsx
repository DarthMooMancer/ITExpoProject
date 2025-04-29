"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Define our theme colors
export const lightTheme = {
  primary: "#ff4713",
  background: "#FFFFFF",
  card: "#F5F5F5",
  text: "#000000",
  border: "#E0E0E0",
  notification: "#FF3B30",
  shadow: "rgba(0, 0, 0, 0.1)",
  secondaryText: "#666666",
  success: "#34C759",
  error: "#FF3B30",
  tabBarBackground: "#FFFFFF",
  tabBarInactive: "#8E8E93",
}

export const darkTheme = {
  primary: "#ff4713",
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  border: "#2C2C2C",
  notification: "#FF453A",
  shadow: "rgba(0, 0, 0, 0.3)",
  secondaryText: "#ABABAB",
  success: "#30D158",
  error: "#FF453A",
  tabBarBackground: "#1E1E1E",
  tabBarInactive: "#8E8E93",
}

type Theme = typeof lightTheme
type ThemeType = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  themeType: ThemeType
  isDark: boolean
  setThemeType: (type: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: "system",
  isDark: false,
  setThemeType: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [themeType, setThemeType] = useState<ThemeType>("system")

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themeType")
        if (savedTheme) {
          setThemeType(savedTheme as ThemeType)
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error)
      }
    }

    loadTheme()
  }, [])

  // Save theme preference when it changes
  const updateThemeType = async (newThemeType: ThemeType) => {
    try {
      await AsyncStorage.setItem("themeType", newThemeType)
      setThemeType(newThemeType)
    } catch (error) {
      console.error("Failed to save theme preference:", error)
    }
  }

  // Determine if we should use dark theme
  const isDark = themeType === "dark" || (themeType === "system" && colorScheme === "dark")

  // Get the appropriate theme object
  const theme = isDark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        isDark,
        setThemeType: updateThemeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
