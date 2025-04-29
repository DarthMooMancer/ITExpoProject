import AsyncStorage from "@react-native-async-storage/async-storage"
import type { User } from "../context/AuthContext"

// Save user to database
export const saveUserToDatabase = async (user: User): Promise<void> => {
  try {
    // Store user data with user ID as key
    await AsyncStorage.setItem(`user:${user.id}`, JSON.stringify(user))

    // Also store user ID by email for lookup
    await AsyncStorage.setItem(`email:${user.email}`, user.id)
  } catch (error) {
    console.error("Error saving user to database:", error)
    throw error
  }
}

// Get user from database by ID
export const getUserFromDatabase = async (userId: string): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(`user:${userId}`)
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error("Error getting user from database:", error)
    return null
  }
}

// Get user from database by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const userId = await AsyncStorage.getItem(`email:${email}`)
    if (!userId) return null

    return getUserFromDatabase(userId)
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

// Update user's followed clubs
export const updateUserFollowedClubs = async (userId: string, clubId: string, follow: boolean): Promise<void> => {
  try {
    const user = await getUserFromDatabase(userId)
    if (!user) return

    let followedClubs = user.followedClubs || []

    if (follow && !followedClubs.includes(clubId)) {
      followedClubs.push(clubId)
    } else if (!follow && followedClubs.includes(clubId)) {
      followedClubs = followedClubs.filter((id) => id !== clubId)
    }

    user.followedClubs = followedClubs
    await saveUserToDatabase(user)
  } catch (error) {
    console.error("Error updating user followed clubs:", error)
    throw error
  }
}
