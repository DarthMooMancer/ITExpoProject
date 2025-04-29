"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import { updateUserFollowedClubs } from "../services/userService"

// Mock data for clubs
const mockClubs = [
  {
    id: "1",
    name: "Robotics Club",
    image: "https://picsum.photos/id/1/800/600",
    members: 42,
    description:
      "The Robotics Club at Anderson High School is dedicated to designing, building, and programming robots for competitions and exhibitions. Members learn valuable skills in engineering, programming, and teamwork while working on exciting robotics projects.\n\nThe club participates in regional and state robotics competitions, and has won several awards for innovation and design excellence. New members are always welcome, regardless of experience level.",
    meetingTime: "Tuesdays, 3:30 PM",
    location: "Room 156",
    advisor: "Mr. Johnson",
    upcomingEvents: [
      {
        id: "e1",
        title: "Robot Design Workshop",
        date: "2023-03-21",
        time: "3:30 PM - 5:00 PM",
      },
      {
        id: "e2",
        title: "Regional Robotics Competition",
        date: "2023-04-15",
        time: "9:00 AM - 4:00 PM",
      },
      {
        id: "e3",
        title: "End of Year Showcase",
        date: "2023-05-20",
        time: "6:00 PM - 8:00 PM",
      },
    ],
  },
  {
    id: "2",
    name: "Debate Team",
    image: "https://picsum.photos/id/20/800/600",
    members: 28,
    description:
      "The Debate Team focuses on developing public speaking and critical thinking skills through competitive debate. Members research current events, construct arguments, and participate in local and regional debate tournaments.",
    meetingTime: "Mondays & Wednesdays, 4:00 PM",
    location: "Room 203",
    advisor: "Ms. Garcia",
    upcomingEvents: [
      {
        id: "e4",
        title: "Practice Debate",
        date: "2023-03-22",
        time: "4:00 PM - 5:30 PM",
      },
      {
        id: "e5",
        title: "City Debate Tournament",
        date: "2023-04-08",
        time: "8:00 AM - 5:00 PM",
      },
    ],
  },
  // Other clubs...
]

const ClubDetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user, updateUserProfile } = useAuth()

  // @ts-ignore - TypeScript doesn't know about our params
  const { id } = route.params

  const club = mockClubs.find((c) => c.id === id)

  const [isFollowing, setIsFollowing] = useState(user?.followedClubs?.includes(id) || false)

  if (!club) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Club not found</Text>
      </View>
    )
  }

  const toggleFollow = async () => {
    if (!user) return

    const newFollowingState = !isFollowing
    setIsFollowing(newFollowingState)

    try {
      // Update in database
      await updateUserFollowedClubs(user.id, club.id, newFollowingState)

      // Update local user state
      const followedClubs = user.followedClubs || []
      const updatedFollowedClubs = newFollowingState
        ? [...followedClubs, club.id]
        : followedClubs.filter((id) => id !== club.id)

      updateUserProfile({ followedClubs: updatedFollowedClubs })
    } catch (error) {
      console.error("Error updating followed clubs:", error)
      // Revert UI state if there was an error
      setIsFollowing(!newFollowingState)
    }
  }

  const shareClub = async () => {
    try {
      await Share.share({
        message: `Check out the ${club.name} at Anderson High School!\n\n${club.description}\n\nShared from RaptorConnect`,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeIn" duration={500}>
          <Image source={{ uri: club.image }} style={styles.image} />
        </Animatable.View>

        <View style={styles.content}>
          <Animatable.View animation="fadeInUp" duration={500} delay={100} style={styles.header}>
            <View>
              <Text style={[styles.clubName, { color: theme.text }]}>{club.name}</Text>
              <Text style={[styles.clubMembers, { color: theme.secondaryText }]}>
                <Feather name="users" size={14} /> {club.members} members
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.followButton,
                {
                  backgroundColor: isFollowing ? theme.background : theme.primary,
                  borderColor: isFollowing ? theme.primary : "transparent",
                  borderWidth: isFollowing ? 1 : 0,
                },
              ]}
              onPress={toggleFollow}
            >
              <Text style={[styles.followButtonText, { color: isFollowing ? theme.primary : "#FFFFFF" }]}>
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={200} style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Feather name="clock" size={16} color={theme.secondaryText} />
              <Text style={[styles.infoText, { color: theme.text }]}>{club.meetingTime}</Text>
            </View>

            <View style={styles.infoItem}>
              <Feather name="map-pin" size={16} color={theme.secondaryText} />
              <Text style={[styles.infoText, { color: theme.text }]}>{club.location}</Text>
            </View>

            <View style={styles.infoItem}>
              <Feather name="user" size={16} color={theme.secondaryText} />
              <Text style={[styles.infoText, { color: theme.text }]}>Advisor: {club.advisor}</Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={300}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
            <Text style={[styles.description, { color: theme.text }]}>{club.description}</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={400}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Events</Text>

            {club.upcomingEvents.map((event, index) => (
              <TouchableOpacity
                key={event.id}
                style={[styles.eventCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => {
                  // @ts-ignore - TypeScript doesn't know about our screen
                  navigation.navigate("EventDetail", { id: event.id })
                }}
              >
                <View style={styles.eventDateContainer}>
                  <Text style={[styles.eventMonth, { color: theme.primary }]}>
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                  </Text>
                  <Text style={[styles.eventDay, { color: theme.text }]}>{new Date(event.date).getDate()}</Text>
                </View>

                <View style={styles.eventDetails}>
                  <Text style={[styles.eventTitle, { color: theme.text }]}>{event.title}</Text>
                  <Text style={[styles.eventTime, { color: theme.secondaryText }]}>{event.time}</Text>
                </View>

                <Feather name="chevron-right" size={20} color={theme.secondaryText} />
              </TouchableOpacity>
            ))}
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={500} style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={shareClub}
            >
              <Feather name="share-2" size={18} color={theme.text} />
              <Text style={[styles.actionButtonText, { color: theme.text }]}>Share</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  clubName: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 4,
  },
  clubMembers: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  followButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: "transparent",
    borderRadius: 12,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
    marginBottom: 24,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  eventDateContainer: {
    alignItems: "center",
    width: 50,
  },
  eventMonth: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  eventDay: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  eventDetails: {
    flex: 1,
    marginLeft: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    marginLeft: 8,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginTop: 20,
  },
})

export default ClubDetailScreen
