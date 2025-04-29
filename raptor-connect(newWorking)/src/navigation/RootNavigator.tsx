"use client"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../context/AuthContext"
import AuthScreen from "../screens/AuthScreen"
import MainTabNavigator from "./MainTabNavigator"
import QuestionnaireScreen from "../screens/QuestionnaireScreen"
import AnnouncementDetailScreen from "../screens/AnnouncementDetailScreen"
import EventDetailScreen from "../screens/EventDetailScreen"
import ClubDetailScreen from "../screens/ClubDetailScreen"
import RaptorReportDetailScreen from "../screens/RaptorReportDetailScreen"
import LoadingScreen from "../screens/LoadingScreen"
import ProfileScreen from "../screens/ProfileScreen"

export type RootStackParamList = {
  Auth: undefined
  Main: undefined
  Questionnaire: undefined
  Profile: undefined
  AnnouncementDetail: { id: string }
  EventDetail: { id: string }
  ClubDetail: { id: string }
  RaptorReportDetail: { id: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} options={{ presentation: "modal" }} />
          <Stack.Screen
            name="AnnouncementDetail"
            component={AnnouncementDetailScreen}
            options={{ headerShown: true, title: "Announcement" }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetailScreen}
            options={{ headerShown: true, title: "Event" }}
          />
          <Stack.Screen name="ClubDetail" component={ClubDetailScreen} options={{ headerShown: true, title: "Club" }} />
          <Stack.Screen
            name="RaptorReportDetail"
            component={RaptorReportDetailScreen}
            options={{ headerShown: true, title: "Raptor Report" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false, presentation: "modal" }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
