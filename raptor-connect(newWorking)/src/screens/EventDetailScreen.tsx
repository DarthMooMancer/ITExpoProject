"use client"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

// Mock data for events
const mockEvents = [
  {
    id: "e1",
    title: "Robot Design Workshop",
    date: "2023-03-21",
    time: "3:30 PM - 5:00 PM",
    location: "Room 156",
    organizer: "Robotics Club",
    description:
      "Learn the fundamentals of robot design and construction in this hands-on workshop. Participants will work in small groups to design and build simple robot prototypes using provided materials. No prior experience necessary!",
    image: "https://picsum.photos/id/1/800/600",
  },
  {
    id: "e2",
    title: "Regional Robotics Competition",
    date: "2023-04-15",
    time: "9:00 AM - 4:00 PM",
    location: "City Convention Center",
    organizer: "Robotics Club",
    description:
      "The annual regional robotics competition brings together teams from schools across the state to compete in various challenges. Our team will be presenting the robot we've been working on all year. Come support the Anderson Raptors Robotics Team!",
    image: "https://picsum.photos/id/20/800/600",
  },
  {
    id: "e3",
    title: "End of Year Showcase",
    date: "2023-05-20",
    time: "6:00 PM - 8:00 PM",
    location: "School Gymnasium",
    organizer: "Robotics Club",
    description:
      "Join us for our end-of-year showcase where we'll be demonstrating all the projects we've worked on throughout the school year. This is a great opportunity to see what the Robotics Club does and learn about joining next year!",
    image: "https://picsum.photos/id/96/800/600",
  },
  {
    id: "e4",
    title: "Practice Debate",
    date: "2023-03-22",
    time: "4:00 PM - 5:30 PM",
    location: "Room 203",
    organizer: "Debate Team",
    description:
      'Weekly practice debate session to prepare for upcoming tournaments. This week\'s topic: "Should social media platforms be regulated as public utilities?" All team members are expected to attend and participate.',
    image: "https://picsum.photos/id/160/800/600",
  },
  {
    id: "e5",
    title: "City Debate Tournament",
    date: "2023-04-08",
    time: "8:00 AM - 5:00 PM",
    location: "Central High School",
    organizer: "Debate Team",
    description:
      "The annual city debate tournament featuring teams from all local high schools. Our team will compete in both individual and team categories. This is our last major competition before the state finals.",
    image: "https://picsum.photos/id/180/800/600",
  },
]

const EventDetailScreen = () => {
  const route = useRoute()
  const { theme } = useTheme()

  // @ts-ignore - TypeScript doesn't know about our params
  const { id } = route.params

  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Event not found</Text>
      </View>
    )
  }

  const shareEvent = async () => {
    try {
      await Share.share({
        message: `${event.title}\n\nDate: ${new Date(event.date).toLocaleDateString()}\nTime: ${event.time}\nLocation: ${event.location}\n\n${event.description}\n\nShared from RaptorConnect`,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const addToCalendar = () => {
    // Implementation would connect to device calendar
    console.log("Add to calendar:", event.title)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeIn" duration={500}>
          <Image source={{ uri: event.image }} style={styles.image} />
        </Animatable.View>

        <View style={styles.content}>
          <Animatable.View animation="fadeInUp" duration={500} delay={100}>
            <Text style={[styles.title, { color: theme.text }]}>{event.title}</Text>
            <Text style={[styles.organizer, { color: theme.primary }]}>Organized by {event.organizer}</Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            duration={500}
            delay={200}
            style={[styles.detailsCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={styles.detailItem}>
              <Feather name="calendar" size={20} color={theme.primary} />
              <Text style={[styles.detailText, { color: theme.text }]}>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Feather name="clock" size={20} color={theme.primary} />
              <Text style={[styles.detailText, { color: theme.text }]}>{event.time}</Text>
            </View>

            <View style={styles.detailItem}>
              <Feather name="map-pin" size={20} color={theme.primary} />
              <Text style={[styles.detailText, { color: theme.text }]}>{event.location}</Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={300}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>About This Event</Text>
            <Text style={[styles.description, { color: theme.text }]}>{event.description}</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={400} style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primary }]} onPress={addToCalendar}>
              <Feather name="calendar" size={18} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Add to Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={shareEvent}
            >
              <Feather name="share-2" size={18} color={theme.text} />
              <Text style={[styles.actionButtonTextAlt, { color: theme.text }]}>Share</Text>
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
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
  },
  organizer: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginBottom: 20,
  },
  detailsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 16,
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  actionButtonText: {
    marginLeft: 8,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  actionButtonTextAlt: {
    marginLeft: 8,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginTop: 20,
  },
})

export default EventDetailScreen
