import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Mock data for the app
  const announcements = [
    { id: 1, title: 'Homecoming Dance This Friday', date: 'Oct 15', important: true },
    { id: 2, title: 'New Library Hours', date: 'Oct 14', important: false },
    { id: 3, title: 'Football Game vs. Rival High', date: 'Oct 13', important: true },
  ];

  const events = [
    { id: 1, title: 'Homecoming Dance', date: 'Oct 15, 7:00 PM', location: 'Gymnasium' },
    { id: 2, title: 'Science Fair', date: 'Oct 20, 3:00 PM', location: 'Auditorium' },
    { id: 3, title: 'Band Concert', date: 'Oct 25, 6:30 PM', location: 'Auditorium' },
  ];

  const testingSchedule = [
    { id: 1, title: 'PSAT', date: 'Oct 18', time: '8:00 AM - 12:00 PM' },
    { id: 2, title: 'ACT', date: 'Oct 22', time: '8:00 AM - 1:00 PM' },
  ];

  const polls = [
    { id: 1, question: 'What should be the theme for Homecoming?', options: ['80s', 'Hollywood', 'Under the Sea'], votes: [45, 30, 25] },
    { id: 2, question: 'Which club should host the next school event?', options: ['Student Council', 'Drama Club', 'Science Club'], votes: [20, 15, 10] },
  ];

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView style={styles.content}>
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>Welcome to RaptorConnect</Text>
              <Text style={styles.heroSubtitle}>Anderson High School's Digital Hub</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Latest Announcements</Text>
              {announcements.map(item => (
                <View key={item.id} style={[styles.card, item.important && styles.importantCard]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {item.important && <Ionicons name="alert-circle" size={20} color="#FF3B30" />}
                  </View>
                  <Text style={styles.cardDate}>{item.date}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              {events.map(item => (
                <View key={item.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDate}>{item.date}</Text>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        );
      
      case 'announcements':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>Announcements</Text>
            {announcements.map(item => (
              <View key={item.id} style={[styles.card, item.important && styles.importantCard]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  {item.important && <Ionicons name="alert-circle" size={20} color="#FF3B30" />}
                </View>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
            ))}
          </ScrollView>
        );
      
      case 'events':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>Events</Text>
            {events.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
              </View>
            ))}
          </ScrollView>
        );
      
      case 'schedule':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>Testing Schedule</Text>
            {testingSchedule.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
            ))}
          </ScrollView>
        );
      
      case 'polls':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>Voting Polls</Text>
            {polls.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.pollQuestion}>{item.question}</Text>
                {item.options.map((option, index) => (
                  <View key={index} style={styles.pollOption}>
                    <View style={styles.pollOptionHeader}>
                      <Text style={styles.pollOptionText}>{option}</Text>
                      <Text style={styles.pollVotes}>{item.votes[index]} votes</Text>
                    </View>
                    <View style={styles.pollBarContainer}>
                      <View 
                        style={[
                          styles.pollBar, 
                          { 
                            width: `${(item.votes[index] / Math.max(...item.votes)) * 100}%`,
                            backgroundColor: index === 0 ? '#007AFF' : index === 1 ? '#34C759' : '#FF9500'
                          }
                        ]} 
                      />
                    </View>
                  </View>
                ))}
                <TouchableOpacity style={styles.voteButton}>
                  <Text style={styles.voteButtonText}>Vote</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        );
      
      case 'videos':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>Morning Announcements</Text>
            <View style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Ionicons name="play-circle" size={50} color="#FFFFFF" />
              </View>
              <Text style={styles.videoTitle}>Morning Announcements - October 15, 2023</Text>
              <Text style={styles.videoDate}>Posted: Oct 15, 2023</Text>
            </View>
            <View style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Ionicons name="play-circle" size={50} color="#FFFFFF" />
              </View>
              <Text style={styles.videoTitle}>Morning Announcements - October 14, 2023</Text>
              <Text style={styles.videoDate}>Posted: Oct 14, 2023</Text>
            </View>
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>RaptorConnect</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {renderContent()}

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'home' && styles.activeTab]} 
          onPress={() => setActiveTab('home')}
        >
          <Ionicons 
            name={activeTab === 'home' ? 'home' : 'home-outline'} 
            size={24} 
            color={activeTab === 'home' ? '#007AFF' : '#8E8E93'} 
          />
          <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'announcements' && styles.activeTab]} 
          onPress={() => setActiveTab('announcements')}
        >
          <Ionicons 
            name={activeTab === 'announcements' ? 'megaphone' : 'megaphone-outline'} 
            size={24} 
            color={activeTab === 'announcements' ? '#007AFF' : '#8E8E93'} 
          />
          <Text style={[styles.tabText, activeTab === 'announcements' && styles.activeTabText]}>Announcements</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'events' && styles.activeTab]} 
          onPress={() => setActiveTab('events')}
        >
          <Ionicons 
            name={activeTab === 'events' ? 'calendar' : 'calendar-outline'} 
            size={24} 
            color={activeTab === 'events' ? '#007AFF' : '#8E8E93'} 
          />
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>Events</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'schedule' && styles.activeTab]} 
          onPress={() => setActiveTab('schedule')}
        >
          <Ionicons 
            name={activeTab === 'schedule' ? 'time' : 'time-outline'} 
            size={24} 
            color={activeTab === 'schedule' ? '#007AFF' : '#8E8E93'} 
          />
          <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>Schedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'polls' && styles.activeTab]} 
          onPress={() => setActiveTab('polls')}
        >
          <Ionicons 
            name={activeTab === 'polls' ? 'bar-chart' : 'bar-chart-outline'} 
            size={24} 
            color={activeTab === 'polls' ? '#007AFF' : '#8E8E93'} 
          />
          <Text style={[styles.tabText, activeTab === 'polls' && styles.activeTabText]}>Polls</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]} 
          onPress={() => setActiveTab('videos')}
        >
          <Ionicons 
            name={activeTab === 'videos' ? 'videocam' : 'videocam-outline'} 
            size={24} 
            color={activeTab === 'videos' ? '#007AFF' : '#8E8E93'} 
          />
          <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>Videos</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  heroSection: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  importantCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardLocation: {
    fontSize: 14,
    color: '#666',
  },
  cardTime: {
    fontSize: 14,
    color: '#666',
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  pollOption: {
    marginBottom: 15,
  },
  pollOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  pollOptionText: {
    fontSize: 14,
    color: '#333',
  },
  pollVotes: {
    fontSize: 14,
    color: '#666',
  },
  pollBarContainer: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  pollBar: {
    height: '100%',
    borderRadius: 4,
  },
  voteButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  voteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  videoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  videoThumbnail: {
    height: 150,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 15,
    paddingBottom: 5,
  },
  videoDate: {
    fontSize: 14,
    color: '#666',
    padding: 15,
    paddingTop: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: '#007AFF',
  },
  tabText: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 5,
  },
  activeTabText: {
    color: '#007AFF',
  },
});
