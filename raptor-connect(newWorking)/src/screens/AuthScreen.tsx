"use client"
import { Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, TextInput, Alert } from "react-native"
import * as Animatable from "react-native-animatable"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useState } from "react"

const { width } = Dimensions.get("window")

const AuthScreen = () => {
  const { signIn } = useAuth()
  const { theme, isDark } = useTheme()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSignIn = async () => {
    try {
      if (!email || !name) {
        Alert.alert("Error", "Please enter both email and name")
        return
      }
      await signIn(email, name)
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Failed to sign in")
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Animatable.View animation="fadeIn" duration={1000} style={styles.logoContainer}>
        <Image source={require("../../assets/logo-a.png")} style={styles.logo} resizeMode="contain" />
        <Animatable.Text animation="fadeInUp" delay={300} style={[styles.title, { color: theme.text }]}>
          RaptorConnect
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" delay={600} style={[styles.subtitle, { color: theme.secondaryText }]}>
          Stay connected with Anderson High School
        </Animatable.Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={900} style={styles.formContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
          placeholder="Enter your school email"
          placeholderTextColor={theme.secondaryText}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
          placeholder="Enter your name"
          placeholderTextColor={theme.secondaryText}
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.Image
        animation="fadeIn"
        delay={1200}
        source={require("../../assets/mascot.png")}
        style={styles.mascotImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: width * 0.8,
    height: 54,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    height: 54,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  mascotImage: {
    position: "absolute",
    bottom: -20,
    right: -20,
    width: 150,
    height: 150,
    opacity: 0.8,
  },
})

export default AuthScreen
