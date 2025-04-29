"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

const grades = ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "Faculty/Staff"]

const QuestionnaireScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user, updateUserProfile } = useAuth()

  const [selectedGrade, setSelectedGrade] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedGrade) return

    setIsSubmitting(true)

    try {
      await updateUserProfile({ grade: selectedGrade })
      navigation.navigate("Main" as never)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Feather name="x" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Complete Your Profile</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Animatable.View animation="fadeInUp" duration={500} style={styles.welcomeContainer}>
            <Text style={[styles.welcomeTitle, { color: theme.text }]}>Welcome to RaptorConnect!</Text>
            <Text style={[styles.welcomeText, { color: theme.secondaryText }]}>
              Please provide a few details to complete your profile.
            </Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={200}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Select Your Grade</Text>

            <View style={styles.gradesContainer}>
              {grades.map((grade, index) => (
                <TouchableOpacity
                  key={grade}
                  style={[
                    styles.gradeButton,
                    {
                      backgroundColor: selectedGrade === grade ? theme.primary : theme.card,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => setSelectedGrade(grade)}
                >
                  <Text style={[styles.gradeButtonText, { color: selectedGrade === grade ? "#FFFFFF" : theme.text }]}>
                    {grade}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={400} style={styles.submitContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: selectedGrade ? theme.primary : theme.card,
                  opacity: selectedGrade ? 1 : 0.7,
                },
              ]}
              onPress={handleSubmit}
              disabled={!selectedGrade || isSubmitting}
            >
              <Text style={[styles.submitButtonText, { color: selectedGrade ? "#FFFFFF" : theme.secondaryText }]}>
                {isSubmitting ? "Saving..." : "Continue"}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 16,
  },
  gradesContainer: {
    marginBottom: 24,
  },
  gradeButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  gradeButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  submitContainer: {
    marginTop: 16,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
})

export default QuestionnaireScreen
