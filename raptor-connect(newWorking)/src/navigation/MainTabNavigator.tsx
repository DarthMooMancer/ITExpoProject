"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "../context/ThemeContext"
import AnnouncementsScreen from "../screens/AnnouncementsScreen"
import CalendarScreen from "../screens/CalendarScreen"
import ClubsScreen from "../screens/ClubsScreen"
import RaptorReportScreen from "../screens/RaptorReportScreen"
import { Feather } from "@expo/vector-icons"
import HeaderRight from "../components/HeaderRight"

export type MainTabParamList = {
  Announcements: undefined
  Calendar: undefined
  Clubs: undefined
  RaptorReport: undefined
}

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTabNavigator = () => {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          borderTopColor: theme.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },
        headerStyle: {
          backgroundColor: theme.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        headerTitleStyle: {
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
        },
        headerTintColor: theme.text,
        headerRight: () => <HeaderRight />,
      }}
    >
      <Tab.Screen
        name="Announcements"
        component={AnnouncementsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="bell" size={size} color={color} />,
          title: "Announcements",
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="calendar" size={size} color={color} />,
          title: "Calendar",
        }}
      />
      <Tab.Screen
        name="Clubs"
        component={ClubsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} />,
          title: "Clubs",
        }}
      />
      <Tab.Screen
        name="RaptorReport"
        component={RaptorReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="file-text" size={size} color={color} />,
          title: "Raptor Report",
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
