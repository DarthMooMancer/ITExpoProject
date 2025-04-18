import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, TextInput, Animated, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isCreateMenuVisible, setIsCreateMenuVisible] = useState(false);
  const [datePickerConfig, setDatePickerConfig] = useState({
    show: false,
    mode: 'date',
    forField: null
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Initialize state with empty arrays
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Homecoming Dance This Friday', date: 'Oct 15', important: true },
    { id: 2, title: 'New Library Hours', date: 'Oct 14', important: false },
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'Homecoming Dance', date: 'Oct 15, 7:00 PM', location: 'Gymnasium' },
    { id: 2, title: 'Science Fair', date: 'Oct 20, 3:00 PM', location: 'Auditorium' },
  ]);

  const [testingSchedule, setTestingSchedule] = useState([
    { id: 1, title: 'PSAT', date: 'Oct 18', time: '8:00 AM - 12:00 PM' },
    { id: 2, title: 'ACT', date: 'Oct 22', time: '8:00 AM - 1:00 PM' },
  ]);

  const [polls, setPolls] = useState([
    {
      id: 1,
      question: 'What should be the theme for Homecoming?',
      options: ['80s', 'Hollywood', 'Under the Sea'],
      votes: [45, 30, 25]
    },
  ]);

  // Initialize newItem state with proper structure
  const [newItem, setNewItem] = useState({});

  // Initialize new item based on type
  const initializeNewItem = (type) => {
    switch (type) {
      case 'announcement':
        return {
          title: '',
          date: '',
          important: false
        };
      case 'event':
        return {
          title: '',
          date: '',
          time: '',
          location: ''
        };
      case 'schedule':
        return {
          title: '',
          date: '',
          time: ''
        };
      case 'poll':
        return {
          question: '',
          options: ['', ''],
          votes: [0, 0]
        };
      default:
        return {};
    }
  };

  const handleCreatePress = (type) => {
    setIsCreateMenuVisible(false);
    setModalType(type);
    setNewItem(initializeNewItem(type));
    setModalVisible(true);
  };

  const handleAddItem = () => {
    const timestamp = Date.now();
    
    switch (modalType) {
      case 'announcement':
        if (!newItem.title || !newItem.date) {
          Alert.alert('Invalid Input', 'Please fill in all fields');
          return;
        }
        setAnnouncements(prev => [...prev, { ...newItem, id: timestamp }]);
        break;

      case 'event':
        if (!newItem.title || !newItem.date || !newItem.location) {
          Alert.alert('Invalid Input', 'Please fill in all fields');
          return;
        }
        setEvents(prev => [...prev, { ...newItem, id: timestamp }]);
        break;

      case 'schedule':
        if (!newItem.title || !newItem.date || !newItem.time) {
          Alert.alert('Invalid Input', 'Please fill in all fields');
          return;
        }
        setTestingSchedule(prev => [...prev, { ...newItem, id: timestamp }]);
        break;

      case 'poll':
        if (!newItem.question || !newItem.options || newItem.options.some(opt => !opt.trim())) {
          Alert.alert('Invalid Input', 'Please provide a question and all options');
          return;
        }
        setPolls(prev => [...prev, {
          id: timestamp,
          question: newItem.question,
          options: newItem.options,
          votes: newItem.options.map(() => 0)
        }]);
        break;
    }

    setModalVisible(false);
    setNewItem({}); // Reset the form
  };

  const handlePollOptions = (action, index = null, value = null) => {
    switch (action) {
      case 'add':
        setNewItem(prev => ({
          ...prev,
          options: [...(prev.options || []), ''],
          votes: [...(prev.votes || []), 0]
        }));
        break;
      case 'remove':
        if (index !== null) {
          setNewItem(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index),
            votes: prev.votes.filter((_, i) => i !== index)
          }));
        }
        break;
      case 'update':
        if (index !== null && value !== null) {
          setNewItem(prev => ({
            ...prev,
            options: prev.options.map((opt, i) => i === index ? value : opt)
          }));
        }
        break;
    }
  };

  // Create menu options
  const createOptions = [
    { type: 'announcement', icon: 'megaphone', label: 'Announcement' },
    { type: 'poll', icon: 'bar-chart', label: 'Poll' },
    { type: 'event', icon: 'calendar', label: 'Event' },
    { type: 'schedule', icon: 'time', label: 'Schedule Item' },
  ];

  const AddButton = ({ onPress }) => (
    <TouchableOpacity 
      style={styles.addButton}
      onPress={onPress}
    >
      <Ionicons name="add-circle" size={24} color="#007AFF" />
    </TouchableOpacity>
  );

  // Add delete handler
  const handleDelete = (type, id) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            switch (type) {
              case 'announcement':
                setAnnouncements(prev => prev.filter(item => item.id !== id));
                break;
              case 'event':
                setEvents(prev => prev.filter(item => item.id !== id));
                break;
              case 'schedule':
                setTestingSchedule(prev => prev.filter(item => item.id !== id));
                break;
              case 'poll':
                setPolls(prev => prev.filter(item => item.id !== id));
                break;
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  // Create a reusable card component with long press
  const DeletableCard = ({ type, item, children }) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          type === 'announcement' && item.important && styles.importantCard
        ]}
        onLongPress={() => handleDelete(type, item.id)}
        delayLongPress={500}
      >
        {children}
      </TouchableOpacity>
    );
  };

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
                <DeletableCard key={item.id} type="announcement" item={item}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {item.important && <Ionicons name="alert-circle" size={20} color="#FF3B30" />}
                  </View>
                  <Text style={styles.cardDate}>{item.date}</Text>
                </DeletableCard>
              ))}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              {events.map(item => (
                <DeletableCard key={item.id} type="event" item={item}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDate}>{item.date}</Text>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </DeletableCard>
              ))}
            </View>
          </ScrollView>
        );
      
      case 'announcements':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>News & Updates</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Announcements</Text>
            {announcements.map(item => (
                <DeletableCard key={item.id} type="announcement" item={item}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  {item.important && <Ionicons name="alert-circle" size={20} color="#FF3B30" />}
                </View>
                <Text style={styles.cardDate}>{item.date}</Text>
                </DeletableCard>
              ))}
              </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Active Polls</Text>
            {polls.map(item => (
                <DeletableCard key={item.id} type="poll" item={item}>
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
                </DeletableCard>
              ))}
              </View>
          </ScrollView>
        );
      
      case 'events':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>Events</Text>
            {events.map(item => (
              <DeletableCard key={item.id} type="event" item={item}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
              </DeletableCard>
            ))}
          </ScrollView>
        );
      
      case 'schedule':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.pageTitle}>Testing Schedule</Text>
            {testingSchedule.map(item => (
              <DeletableCard key={item.id} type="schedule" item={item}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </DeletableCard>
            ))}
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  // Unified function to handle opening date/time picker
  const openPicker = (mode, forField) => {
    setDatePickerConfig({
      show: true,
      mode,
      forField
    });
  };

  // Modified onDateTimeChange function
  const onDateTimeChange = (event, selected) => {
    if (Platform.OS === 'android') {
      setDatePickerConfig({ ...datePickerConfig, show: false });
    }

    if (selected) {
      setSelectedDate(selected);
      
      if (datePickerConfig.mode === 'date') {
        setNewItem(prev => ({
          ...prev,
          date: selected.toLocaleDateString()
        }));
      } else {
        setNewItem(prev => ({
          ...prev,
          time: selected.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
      }
    }
  };

  // Add new function to handle iOS picker completion
  const handleIOSPickerDone = () => {
    onDateTimeChange({ type: 'set' }, selectedDate);
    setDatePickerConfig({ ...datePickerConfig, show: false });
  };

  // Add new function to handle iOS picker cancellation
  const handleIOSPickerCancel = () => {
    setDatePickerConfig({ ...datePickerConfig, show: false });
  };

  // Function to close modal and reset states
  const closeModal = () => {
    setModalVisible(false);
    setNewItem({});
    setDatePickerConfig({ show: false, mode: 'date', forField: null });
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

        {/* Modified Tab Navigation */}
      <View style={styles.tabBar}>
          {/* Left side tabs */}
          <View style={styles.tabGroup}>
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
              <Text style={[styles.tabText, activeTab === 'announcements' && styles.activeTabText]}>News</Text>
            </TouchableOpacity>
          </View>

          {/* Center Create Button */}
          <View style={styles.createButtonContainer}>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => setIsCreateMenuVisible(true)}
            >
              <View style={styles.createButtonInner}>
                <Ionicons name="add" size={32} color="#FFFFFF" />
              </View>
        </TouchableOpacity>
          </View>
        
          {/* Right side tabs */}
          <View style={styles.tabGroup}>
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
          </View>
        </View>

        {/* Create Menu Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isCreateMenuVisible}
          onRequestClose={() => setIsCreateMenuVisible(false)}
        >
          <TouchableOpacity 
            style={styles.createMenuOverlay}
            activeOpacity={1}
            onPress={() => setIsCreateMenuVisible(false)}
          >
            <View style={styles.createMenu}>
              {createOptions.map((option) => (
        <TouchableOpacity 
                  key={option.type}
                  style={styles.createMenuItem}
                  onPress={() => handleCreatePress(option.type)}
                >
                  <Ionicons name={option.icon} size={24} color="#007AFF" />
                  <Text style={styles.createMenuItemText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Modified Add Item Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New {modalType}</Text>
              
              {modalType === 'announcement' && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={newItem.title}
                    onChangeText={(text) => setNewItem({...newItem, title: text})}
                  />
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => openPicker('date', 'date')}
                  >
                    <Text style={styles.dateButtonText}>
                      {newItem.date || 'Select Date'}
                    </Text>
                    <Ionicons name="calendar" size={24} color="#007AFF" />
                  </TouchableOpacity>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>Mark as Important</Text>
                    <TouchableOpacity
                      style={[styles.checkbox, newItem.important && styles.checkboxChecked]}
                      onPress={() => setNewItem(prev => ({ ...prev, important: !prev.important }))}
                    >
                      {newItem.important && <Ionicons name="checkmark" size={18} color="#FFF" />}
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {modalType === 'event' && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Event Title"
                    value={newItem.title}
                    onChangeText={(text) => setNewItem({...newItem, title: text})}
                  />
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => openPicker('date', 'date')}
                  >
                    <Text style={styles.dateButtonText}>
                      {newItem.date || 'Select Date'}
                    </Text>
                    <Ionicons name="calendar" size={24} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => openPicker('time', 'time')}
                  >
                    <Text style={styles.dateButtonText}>
                      {newItem.time || 'Select Time'}
                    </Text>
                    <Ionicons name="time" size={24} color="#007AFF" />
        </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={newItem.location}
                    onChangeText={(text) => setNewItem({...newItem, location: text})}
                  />
                </>
              )}

              {modalType === 'schedule' && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={newItem.title}
                    onChangeText={(text) => setNewItem({...newItem, title: text})}
                  />
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => openPicker('date', 'date')}
                  >
                    <Text style={styles.dateButtonText}>
                      {newItem.date || 'Select Date'}
                    </Text>
                    <Ionicons name="calendar" size={24} color="#007AFF" />
                  </TouchableOpacity>
        <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => openPicker('time', 'time')}
                  >
                    <Text style={styles.dateButtonText}>
                      {newItem.time || 'Select Time'}
                    </Text>
                    <Ionicons name="time" size={24} color="#007AFF" />
                  </TouchableOpacity>
                </>
              )}

              {modalType === 'poll' && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Question"
                    value={newItem.question}
                    onChangeText={(text) => setNewItem({...newItem, question: text})}
                  />
                  <Text style={styles.optionsLabel}>Options:</Text>
                  {(newItem.options || []).map((option, index) => (
                    <View key={index} style={styles.optionContainer}>
                      <TextInput
                        style={styles.optionInput}
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChangeText={(text) => {
                          const newOptions = [...(newItem.options || [])];
                          newOptions[index] = text;
                          setNewItem({...newItem, options: newOptions});
                        }}
                      />
                      <TouchableOpacity
                        style={styles.removeOptionButton}
                        onPress={() => {
                          const newOptions = newItem.options.filter((_, i) => i !== index);
                          setNewItem({...newItem, options: newOptions});
                        }}
                      >
                        <Ionicons name="remove-circle" size={24} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.addOptionButton}
                    onPress={() => {
                      const newOptions = [...(newItem.options || []), ''];
                      setNewItem({...newItem, options: newOptions});
                    }}
                  >
                    <Text style={styles.addOptionButtonText}>Add Option</Text>
                  </TouchableOpacity>
                </>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.addButton]}
                  onPress={handleAddItem}
                >
                  <Text style={styles.modalButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

              {/* Modified Date/Time Picker for iOS */}
              {Platform.OS === 'ios' ? (
                datePickerConfig.show && (
                  <View style={styles.iosPickerContainer}>
                    <View style={styles.iosPickerHeader}>
                      <TouchableOpacity onPress={handleIOSPickerCancel}>
                        <Text style={styles.iosPickerHeaderButton}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleIOSPickerDone}>
                        <Text style={styles.iosPickerHeaderButton}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={selectedDate}
                      mode={datePickerConfig.mode}
                      display="spinner"
                      onChange={(event, date) => {
                        if (date) setSelectedDate(date);
                      }}
                      style={styles.iosPicker}
                    />
                  </View>
                )
              ) : (
                datePickerConfig.show && (
                  <DateTimePicker
                    value={selectedDate}
                    mode={datePickerConfig.mode}
                    display="default"
                    onChange={onDateTimeChange}
                  />
                )
              )}
            </View>
          </View>
        </Modal>

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
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  createButtonContainer: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
  },
  createButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createMenuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  createMenu: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  createMenuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  optionsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  removeOptionButton: {
    padding: 5,
  },
  addOptionButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addOptionButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iosPickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iosPickerHeaderButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iosPicker: {
    height: 200,
  },
});
