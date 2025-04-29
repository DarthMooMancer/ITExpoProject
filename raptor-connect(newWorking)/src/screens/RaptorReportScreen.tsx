"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
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
    image: "https://picsum.photos/id/1058/800/600",
    content:
      "The Anderson High School basketball team has advanced to the state finals after a thrilling victory in the semifinal game. The team will face their longtime rivals, Westview High, in the championship game next Saturday.",
    category: "Sports",
  },
  {
    id: "2",
    title: "Science Fair Winners Announced",
    date: "2023-03-10",
    author: "Michael Chen",
    image: "https://picsum.photos/id/1/800/600",
    content:
      "The annual science fair was a great success, with over 50 student projects showcasing innovation and scientific inquiry. The grand prize was awarded to junior Emma Rodriguez for her project on renewable energy solutions.",
    category: "Academics",
  },
  {
    id: "3",
    title: "Spring Musical Opens This Weekend",
    date: "2023-03-08",
    author: "David Park",
    image: "https://picsum.photos/id/96/800/600",
    content:
      'The drama department\'s production of "Into the Woods" opens this Friday at 7pm in the school auditorium. The cast and crew have been rehearsing for months to bring this beloved musical to life.',
    category: "Arts",
  },
  {
    id: "4",
    title: "New Lunch Options Coming Next Month",
    date: "2023-03-05",
    author: "Lisa Martinez",
    image: "https://picsum.photos/id/292/800/600",
    content:
      "The cafeteria will be introducing several new lunch options starting next month, including more vegetarian and gluten-free choices. The changes come in response to a student survey conducted earlier this year.",
    category: "School News",
  },
]

const categories = ["All", "Sports", "Academics", "Arts", "School News"]

const RaptorReportScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [refreshing, setRefreshing] = useState(false)

  // Filter articles based on selected category
  const filteredArticles =
    selectedCategory === "All" ? mockArticles : mockArticles.filter((article) => article.category === selectedCategory)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }, [])

  const renderArticleCard = ({ item, index }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={index * 100}
        style={[styles.articleCard, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about our screen
            navigation.navigate("RaptorReportDetail", { id: item.id })
          }}
        >
          <Image source={{ uri: item.image }} style={styles.articleImage} />
          <View style={styles.articleContent}>
            <View style={styles.articleMeta}>
              <Text style={[styles.articleCategory, { color: theme.primary }]}>{item.category}</Text>
              <Text style={[styles.articleDate, { color: theme.secondaryText }]}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={[styles.articleTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.articleExcerpt, { color: theme.secondaryText }]} numberOfLines={2}>
              {item.content}
            </Text>
            <View style={styles.articleAuthor}>
              <Feather name="user" size={14} color={theme.secondaryText} />
              <Text style={[styles.articleAuthorName, { color: theme.secondaryText }]}>{item.author}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Raptor Report</Text>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category ? theme.primary : "transparent",
                  borderColor: selectedCategory === category ? theme.primary : theme.border,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[styles.categoryButtonText, { color: selectedCategory === category ? "#FFFFFF" : theme.text }]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredArticles}
        renderItem={renderArticleCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.articlesList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
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
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  articlesList: {
    padding: 16,
  },
  articleCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
  },
  articleImage: {
    width: "100%",
    height: 180,
  },
  articleContent: {
    padding: 16,
  },
  articleMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  articleCategory: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  articleDate: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  articleTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  articleExcerpt: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
    marginBottom: 8,
  },
  articleAuthor: {
    flexDirection: "row",
    alignItems: "center",
  },
  articleAuthorName: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
})

export default RaptorReportScreen
