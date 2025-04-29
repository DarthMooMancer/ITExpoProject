"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import * as Animatable from "react-native-animatable"
import { Feather } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

// Mock data for announcements
const mockAnnouncements = [
  {
    id: "1",
    title: "Spring Break Schedule",
    date: "2023-03-10",
    image: "https://picsum.photos/id/1018/800/600",
    description: "Important information about the upcoming spring break schedule and activities.",
  },
  {
    id: "2",
    title: "Basketball Championship",
    date: "2023-03-05",
    image: "https://picsum.photos/id/1058/800/600",
    description: "Our basketball team has made it to the state championships! Come support the Raptors!",
  },
  {
    id: "3",
    title: "College Application Workshop",
    date: "2023-03-15",
    image: "https://picsum.photos/id/1025/800/600",
    description: "Seniors: Don't miss this important workshop on college applications and financial aid.",
  },
]

const AnnouncementsScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }, [])

  const renderAnnouncementCard = ({ item, index }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={index * 100}
        style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about our screen
            navigation.navigate("AnnouncementDetail", { id: item.id })
          }}
        >
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={[styles.date, { color: theme.secondaryText }]}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.description, { color: theme.secondaryText }]} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncementCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Announcements</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.primary }]}>
                <Text style={styles.filterButtonText}>Newest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              >
                <Text style={[styles.filterButtonText, { color: theme.text }]}>Filter</Text>
                <Feather name="filter" size={14} color={theme.text} style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  filterButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  filterIcon: {
    marginLeft: 6,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  date: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
})

export default AnnouncementsScreen
