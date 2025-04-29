"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { Calendar } from "react-native-calendars"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

const { width } = Dimensions.get("window")

// Mock data for events
const mockEvents = [
  {
    id: "1",
    title: "Basketball Game vs. Westview",
    date: "2023-03-15",
    time: "7:00 PM",
    location: "Main Gymnasium",
    description: "Varsity basketball game against Westview High School.",
  },
  {
    id: "2",
    title: "Science Fair",
    date: "2023-03-15",
    time: "3:30 PM - 6:00 PM",
    location: "Cafeteria",
    description: "Annual science fair showcasing student projects.",
  },
  {
    id: "3",
    title: "Parent-Teacher Conferences",
    date: "2023-03-16",
    time: "4:00 PM - 8:00 PM",
    location: "Classrooms",
    description: "Spring parent-teacher conferences.",
  },
  {
    id: "4",
    title: "Spring Concert",
    date: "2023-03-20",
    time: "7:00 PM",
    location: "Auditorium",
    description: "Spring concert featuring band and choir performances.",
  },
]

const CalendarScreen = () => {
  const navigation = useNavigation()
  const { theme, isDark } = useTheme()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [view, setView] = useState("month") // 'month' or 'week'

  // Filter events for selected date
  const eventsForSelectedDate = mockEvents.filter((event) => event.date === selectedDate)

  // Create marked dates object for calendar
  const markedDates = {}
  mockEvents.forEach((event) => {
    if (!markedDates[event.date]) {
      markedDates[event.date] = { marked: true, dotColor: theme.primary }
    }
  })

  // Add selected date styling
  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: theme.primary,
  }

  const renderEventItem = ({ item, index }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={index * 100}
        style={[styles.eventCard, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about our screen
            navigation.navigate("EventDetail", { id: item.id })
          }}
        >
          <View style={styles.eventTimeContainer}>
            <View style={[styles.eventTimeDot, { backgroundColor: theme.primary }]} />
            <Text style={[styles.eventTime, { color: theme.secondaryText }]}>{item.time}</Text>
          </View>

          <View style={styles.eventContent}>
            <Text style={[styles.eventTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.eventLocation, { color: theme.secondaryText }]}>
              <Feather name="map-pin" size={12} /> {item.location}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Calendar</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewToggleButton, view === "month" && { backgroundColor: theme.primary }]}
            onPress={() => setView("month")}
          >
            <Text style={[styles.viewToggleText, { color: view === "month" ? "#FFFFFF" : theme.text }]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleButton, view === "week" && { backgroundColor: theme.primary }]}
            onPress={() => setView("week")}
          >
            <Text style={[styles.viewToggleText, { color: view === "week" ? "#FFFFFF" : theme.text }]}>Week</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          backgroundColor: theme.background,
          calendarBackground: theme.background,
          textSectionTitleColor: theme.secondaryText,
          selectedDayBackgroundColor: theme.primary,
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: theme.primary,
          dayTextColor: theme.text,
          textDisabledColor: theme.secondaryText + "50",
          dotColor: theme.primary,
          selectedDotColor: "#FFFFFF",
          arrowColor: theme.primary,
          monthTextColor: theme.text,
          indicatorColor: theme.primary,
          textDayFontFamily: "Poppins_400Regular",
          textMonthFontFamily: "Poppins_600SemiBold",
          textDayHeaderFontFamily: "Poppins_500Medium",
        }}
      />

      <View style={styles.eventsContainer}>
        <View style={styles.eventsHeader}>
          <Text style={[styles.eventsTitle, { color: theme.text }]}>
            Events for {new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
          </Text>
          <TouchableOpacity>
            <Feather name="plus" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        {eventsForSelectedDate.length > 0 ? (
          <FlatList
            data={eventsForSelectedDate}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.eventsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noEventsContainer}>
            <Feather name="calendar" size={40} color={theme.secondaryText} />
            <Text style={[styles.noEventsText, { color: theme.secondaryText }]}>No events scheduled for this day</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  viewToggle: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
  },
  viewToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewToggleText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  eventsTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  eventsList: {
    paddingBottom: 16,
  },
  eventCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  eventTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eventTimeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  eventTime: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  eventContent: {
    marginLeft: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  noEventsText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginTop: 16,
    textAlign: "center",
  },
})

export default CalendarScreen
