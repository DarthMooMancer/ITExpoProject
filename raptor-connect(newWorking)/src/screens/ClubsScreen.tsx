"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

const { width } = Dimensions.get("window")

// Mock data for clubs
const mockClubs = [
  {
    id: "1",
    name: "Robotics Club",
    image: "https://picsum.photos/id/1/800/600",
    members: 42,
    description: "Design, build, and program robots for competitions and exhibitions.",
    meetingTime: "Tuesdays, 3:30 PM",
    location: "Room 156",
  },
  {
    id: "2",
    name: "Debate Team",
    image: "https://picsum.photos/id/20/800/600",
    members: 28,
    description: "Develop public speaking and critical thinking skills through competitive debate.",
    meetingTime: "Mondays & Wednesdays, 4:00 PM",
    location: "Room 203",
  },
  {
    id: "3",
    name: "Art Club",
    image: "https://picsum.photos/id/96/800/600",
    members: 35,
    description: "Express creativity through various art forms and participate in school exhibitions.",
    meetingTime: "Thursdays, 3:30 PM",
    location: "Art Room",
  },
  {
    id: "4",
    name: "Environmental Club",
    image: "https://picsum.photos/id/142/800/600",
    members: 22,
    description: "Work on sustainability projects and raise awareness about environmental issues.",
    meetingTime: "Fridays, 3:30 PM",
    location: "Room 118",
  },
  {
    id: "5",
    name: "Chess Club",
    image: "https://picsum.photos/id/160/800/600",
    members: 18,
    description: "Learn and play chess, participate in tournaments, and develop strategic thinking.",
    meetingTime: "Tuesdays, 4:00 PM",
    location: "Library",
  },
]

// Trending clubs (subset of all clubs)
const trendingClubs = [mockClubs[0], mockClubs[2], mockClubs[4]]

const ClubsScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter clubs based on search query
  const filteredClubs = searchQuery
    ? mockClubs.filter(
        (club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockClubs

  const renderClubCard = ({ item, index }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={index * 100}
        style={[styles.clubCard, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about our screen
            navigation.navigate("ClubDetail", { id: item.id })
          }}
        >
          <Image source={{ uri: item.image }} style={styles.clubImage} />
          <View style={styles.clubContent}>
            <Text style={[styles.clubName, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.clubMembers, { color: theme.secondaryText }]}>
              <Feather name="users" size={14} /> {item.members} members
            </Text>
            <Text style={[styles.clubDescription, { color: theme.secondaryText }]} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    )
  }

  const renderTrendingClub = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          // @ts-ignore - TypeScript doesn't know about our screen
          navigation.navigate("ClubDetail", { id: item.id })
        }}
        style={[styles.trendingClub, { marginLeft: index === 0 ? 16 : 12 }]}
      >
        <Image source={{ uri: item.image }} style={styles.trendingClubImage} />
        <View style={[styles.trendingClubOverlay, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
          <Text style={styles.trendingClubName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Discover Clubs</Text>
        <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Feather name="search" size={18} color={theme.secondaryText} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search clubs..."
            placeholderTextColor={theme.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={18} color={theme.secondaryText} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!searchQuery && (
        <View style={styles.trendingSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Trending Clubs</Text>
          <FlatList
            data={trendingClubs}
            renderItem={renderTrendingClub}
            keyExtractor={(item) => `trending-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
          />
        </View>
      )}

      <FlatList
        data={filteredClubs}
        renderItem={renderClubCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.clubsList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          searchQuery ? (
            <Text style={[styles.resultsText, { color: theme.secondaryText }]}>
              {filteredClubs.length} {filteredClubs.length === 1 ? "result" : "results"} found
            </Text>
          ) : (
            <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 8 }]}>All Clubs</Text>
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  trendingSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 16,
    marginBottom: 12,
  },
  trendingList: {
    paddingRight: 16,
  },
  trendingClub: {
    width: 160,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
  },
  trendingClubImage: {
    width: "100%",
    height: "100%",
  },
  trendingClubOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  trendingClubName: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  clubsList: {
    padding: 16,
    paddingTop: 0,
  },
  resultsText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginBottom: 12,
  },
  clubCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
  },
  clubImage: {
    width: "100%",
    height: 120,
  },
  clubContent: {
    padding: 16,
  },
  clubName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  clubMembers: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: 8,
  },
  clubDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
})

export default ClubsScreen
