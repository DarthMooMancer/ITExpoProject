"use client"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

// Mock data for announcements
const mockAnnouncements = [
  {
    id: "1",
    title: "Spring Break Schedule",
    date: "2023-03-10",
    image: "https://picsum.photos/id/1018/800/600",
    description:
      "Important information about the upcoming spring break schedule and activities. Spring break will begin on Monday, March 20th and classes will resume on Monday, March 27th. During this time, the school building will be closed for maintenance and deep cleaning.\n\nStudents are encouraged to use this time to rest and prepare for the final quarter of the school year. Remember to complete any assigned homework and stay safe during your break activities.\n\nThe school library will be open on Wednesday, March 22nd from 10am to 2pm for students who need to access resources or use computers.",
    author: "Principal Johnson",
  },
  {
    id: "2",
    title: "Basketball Championship",
    date: "2023-03-05",
    image: "https://picsum.photos/id/1058/800/600",
    description:
      "Our basketball team has made it to the state championships! The championship game will be held at the State Arena on Saturday, March 18th at 7pm. Tickets are available for purchase in the main office or online through the school website.\n\nBuses will be provided for students who wish to attend the game. Permission slips must be turned in by Wednesday, March 15th.\n\nLet's show our Raptor pride and support our team as they compete for the state title!",
    author: "Coach Williams",
  },
  {
    id: "3",
    title: "College Application Workshop",
    date: "2023-03-15",
    image: "https://picsum.photos/id/1025/800/600",
    description:
      "Seniors: Don't miss this important workshop on college applications and financial aid. The workshop will be held in the school auditorium on Thursday, March 16th from 6pm to 8pm.\n\nTopics covered will include:\n- Completing the FAFSA\n- Scholarship opportunities\n- Writing effective college essays\n- Understanding financial aid packages\n\nParents are encouraged to attend with their students. Representatives from several local colleges will be available to answer questions.",
    author: "Guidance Department",
  },
]

const AnnouncementDetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { theme } = useTheme()

  // @ts-ignore - TypeScript doesn't know about our params
  const { id } = route.params

  const announcement = mockAnnouncements.find((a) => a.id === id)

  if (!announcement) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Announcement not found</Text>
      </View>
    )
  }

  const shareAnnouncement = async () => {
    try {
      await Share.share({
        message: `${announcement.title}\n\n${announcement.description}\n\nShared from RaptorConnect`,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeIn" duration={500}>
          <Image source={{ uri: announcement.image }} style={styles.image} />
        </Animatable.View>

        <View style={styles.content}>
          <Animatable.View animation="fadeInUp" duration={500} delay={100}>
            <Text style={[styles.date, { color: theme.secondaryText }]}>
              {new Date(announcement.date).toLocaleDateString()}
            </Text>
            <Text style={[styles.title, { color: theme.text }]}>{announcement.title}</Text>
            <Text style={[styles.author, { color: theme.secondaryText }]}>By {announcement.author}</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={200} style={styles.descriptionContainer}>
            <Text style={[styles.description, { color: theme.text }]}>{announcement.description}</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={300} style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={shareAnnouncement}
            >
              <Feather name="share-2" size={18} color={theme.text} />
              <Text style={[styles.actionButtonText, { color: theme.text }]}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => {}}
            >
              <Feather name="calendar" size={18} color={theme.text} />
              <Text style={[styles.actionButtonText, { color: theme.text }]}>Add to Calendar</Text>
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
    height: 250,
  },
  content: {
    padding: 20,
  },
  date: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginBottom: 16,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
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
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 6,
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

export default AnnouncementDetailScreen
