"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { saveUserToDatabase, getUserFromDatabase } from "../services/userService"

// Define user type
export interface User {
  id: string
  email: string
  name: string
  photoUrl?: string
  grade?: string
  followedClubs?: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user")
        if (userJson) {
          const userData = JSON.parse(userJson)
          setUser(userData)

          // Refresh user data from database
          const refreshedUser = await getUserFromDatabase(userData.id)
          if (refreshedUser) {
            setUser(refreshedUser)
            await AsyncStorage.setItem("user", JSON.stringify(refreshedUser))
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const signIn = async (email: string, name: string) => {
    try {
      // Check if email is from school domain
      const isSchoolEmail = email.endsWith("@anderson.edu") || 
                          email.endsWith("@student.anderson.edu") || 
                          email.endsWith("@foresthills.edu") ||
                          email.endsWith(".edu") // Allow any .edu domain

      if (!isSchoolEmail) {
        throw new Error("Please use your school email address")
      }

      const userData: User = {
        id: email, // Using email as ID for simplicity
        email,
        name,
      }

      // Save user to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData))

      // Save user to database
      await saveUserToDatabase(userData)

      setUser(userData)
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return

    try {
      const updatedUser = { ...user, ...data }
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser))
      await saveUserToDatabase(updatedUser)
      setUser(updatedUser)
    } catch (error) {
      console.error("Error updating user profile:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
