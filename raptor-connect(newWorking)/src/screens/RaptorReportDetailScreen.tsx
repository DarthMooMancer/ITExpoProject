"use client"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

// Mock data for Raptor Report articles
const mockArticles = [
  {
    id: "1",
    title: "Basketball Team Advances to State Finals",
    date: "2023-03-12",
    author: "Sarah Johnson",
    authorRole: "Sports Editor",
    image: "https://picsum.photos/id/1058/800/600",
    content:
      'The Anderson High School basketball team has advanced to the state finals after a thrilling victory in the semifinal game. The team will face their longtime rivals, Westview High, in the championship game next Saturday.\n\nLed by senior captain Marcus Thompson, who scored 28 points in the semifinal, the Raptors overcame a 10-point deficit in the fourth quarter to secure the win. "We never gave up," said Thompson. "Coach always tells us to play until the final buzzer, and that\'s exactly what we did."\n\nHead Coach Robert Wilson praised the team\'s resilience and teamwork. "These kids have worked incredibly hard all season. They deserve this opportunity to compete for the state title."\n\nThe championship game will be held at the State Arena on Saturday at 7pm. Tickets are available for purchase in the main office or online through the school website. Buses will be provided for students who wish to attend the game.',
    category: "Sports",
  },
  {
    id: "2",
    title: "Science Fair Winners Announced",
    date: "2023-03-10",
    author: "Michael Chen",
    authorRole: "Academic Reporter",
    image: "https://picsum.photos/id/1/800/600",
    content:
      'The annual science fair was a great success, with over 50 student projects showcasing innovation and scientific inquiry. The grand prize was awarded to junior Emma Rodriguez for her project on renewable energy solutions.\n\nRodriguez developed a small-scale solar and wind hybrid system that demonstrated improved efficiency over traditional single-source renewable setups. "I was inspired by the energy challenges we face globally," Rodriguez explained. "I wanted to create something that could make a real difference."\n\nOther notable winners included sophomore James Kim for his research on water purification techniques and senior Aisha Patel for her study on the effects of microplastics in local waterways.\n\nScience department chair Dr. Lisa Chen expressed pride in all participants. "The level of creativity and scientific rigor displayed by our students was exceptional. These young scientists are tackling real-world problems with impressive sophistication."\n\nAll winning projects will be displayed in the school library for the next two weeks, and Rodriguez will represent Anderson High at the regional science competition next month.',
    category: "Academics",
  },
  {
    id: "3",
    title: "Spring Musical Opens This Weekend",
    date: "2023-03-08",
    author: "David Park",
    authorRole: "Arts Correspondent",
    image: "https://picsum.photos/id/96/800/600",
    content:
      'The drama department\'s production of "Into the Woods" opens this Friday at 7pm in the school auditorium. The cast and crew have been rehearsing for months to bring this beloved musical to life.\n\nDirected by drama teacher Ms. Jennifer Garcia, the production features a talented ensemble of over 30 students both on stage and behind the scenes. Senior Olivia Martinez stars as the Baker\'s Wife, with junior Ethan Williams as the Baker.\n\n"This show has been challenging but incredibly rewarding," said Martinez. "The music is complex, and the characters have so many layers. It\'s been an amazing experience bringing these fairy tales to life."\n\nThe technical crew, led by stage manager Sophia Lee, has created elaborate sets and lighting designs to transform the auditorium into an enchanted forest. "We\'ve put countless hours into making the visual elements of the show as magical as the story itself," Lee explained.\n\nPerformances will run Friday and Saturday at 7pm, with a Sunday matinee at 2pm. Tickets are $10 for students and $15 for adults, available at the door or in advance from the main office.',
    category: "Arts",
  },
  {
    id: "4",
    title: "New Lunch Options Coming Next Month",
    date: "2023-03-05",
    author: "Lisa Martinez",
    authorRole: "School News Reporter",
    image: "https://picsum.photos/id/292/800/600",
    content:
      'The cafeteria will be introducing several new lunch options starting next month, including more vegetarian and gluten-free choices. The changes come in response to a student survey conducted earlier this year.\n\n"We\'re committed to providing nutritious and appealing food options that meet the diverse needs of our student body," said Food Services Director Mr. James Rodriguez. "The survey results showed a clear desire for more plant-based options and accommodations for dietary restrictions."\n\nNew menu items will include a build-your-own grain bowl station, expanded salad bar offerings, and rotating international cuisine options. The cafeteria will also introduce compostable packaging for all grab-and-go items as part of the school\'s sustainability initiative.\n\nStudent Council representative Zoe Thompson, who helped organize the food survey, expressed enthusiasm about the changes. "It\'s great to see the administration listening to student feedback. These new options will make lunchtime better for everyone, especially those with specific dietary needs."\n\nA complete menu of new offerings will be posted on the school website next week, and students are encouraged to provide ongoing feedback as the new options are implemented.',
    category: "School News",
  },
]

const RaptorReportDetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { theme } = useTheme()

  // @ts-ignore - TypeScript doesn't know about our params
  const { id } = route.params

  const article = mockArticles.find((a) => a.id === id)

  if (!article) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Article not found</Text>
      </View>
    )
  }

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\nBy ${article.author}\n\n${article.content}\n\nShared from RaptorConnect`,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeIn" duration={500}>
          <Image source={{ uri: article.image }} style={styles.image} />
        </Animatable.View>

        <View style={styles.content}>
          <Animatable.View animation="fadeInUp" duration={500} delay={100}>
            <Text style={[styles.category, { color: theme.primary }]}>{article.category}</Text>
            <Text style={[styles.title, { color: theme.text }]}>{article.title}</Text>
            <View style={styles.authorContainer}>
              <View style={styles.authorInfo}>
                <Text style={[styles.authorName, { color: theme.text }]}>{article.author}</Text>
                <Text style={[styles.authorRole, { color: theme.secondaryText }]}>{article.authorRole}</Text>
              </View>
              <Text style={[styles.date, { color: theme.secondaryText }]}>
                {new Date(article.date).toLocaleDateString()}
              </Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={200} style={styles.articleContent}>
            <Text style={[styles.articleText, { color: theme.text }]}>{article.content}</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={500} delay={300} style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={shareArticle}
            >
              <Feather name="share-2" size={18} color={theme.text} />
              <Text style={[styles.actionButtonText, { color: theme.text }]}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => {}}
            >
              <Feather name="bookmark" size={18} color={theme.text} />
              <Text style={[styles.actionButtonText, { color: theme.text }]}>Save</Text>
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
  category: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 16,
    lineHeight: 32,
  },
  authorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  authorRole: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  date: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  articleContent: {
    marginBottom: 24,
  },
  articleText: {
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

export default RaptorReportDetailScreen
