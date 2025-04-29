"use client"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"

const HeaderRight = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Clubs" as never)}>
        <Feather name="search" size={22} color={theme.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => {
          // @ts-ignore - TypeScript doesn't know about our screen
          navigation.navigate("Profile")
        }}
      >
        {user?.photoUrl ? (
          <Image source={{ uri: user.photoUrl }} style={[styles.profileImage, { borderColor: theme.border }]} />
        ) : (
          <Feather name="user" size={22} color={theme.text} />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  iconButton: {
    marginLeft: 20,
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
  },
})

export default HeaderRight
