"use client"
import { View, ActivityIndicator, StyleSheet, Image } from "react-native"
import { useTheme } from "../context/ThemeContext"
import * as Animatable from "react-native-animatable"

const LoadingScreen = () => {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <Image source={require("../../assets/logo-a.png")} style={styles.logo} resizeMode="contain" />
      </Animatable.View>
      <ActivityIndicator size="large" color={theme.primary} style={styles.spinner} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  spinner: {
    marginTop: 20,
  },
})

export default LoadingScreen
