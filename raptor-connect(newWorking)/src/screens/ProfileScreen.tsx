"use client"

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

const ProfileScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Feather name="x" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
      </View>

      <Animatable.View animation="fadeInUp" duration={500} style={styles.content}>
        <View style={styles.profileSection}>
          {user?.photoUrl ? (
            <Image source={{ uri: user.photoUrl }} style={[styles.profileImage, { borderColor: theme.border }]} />
          ) : (
            <View style={[styles.profileImage, { borderColor: theme.border, backgroundColor: theme.card }]}>
              <Feather name="user" size={40} color={theme.text} />
            </View>
          )}
          <Text style={[styles.name, { color: theme.text }]}>{user?.name}</Text>
          <Text style={[styles.email, { color: theme.secondaryText }]}>{user?.email}</Text>
          {user?.grade && (
            <Text style={[styles.grade, { color: theme.secondaryText }]}>{user.grade}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={handleSignOut}
        >
          <Feather name="log-out" size={20} color={theme.error} />
          <Text style={[styles.buttonText, { color: theme.error }]}>Sign Out</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  closeButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginBottom: 4,
  },
  grade: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 8,
  },
})

export default ProfileScreen 