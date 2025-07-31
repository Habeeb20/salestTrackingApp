import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FooterNav from './FooterNav';
const IconGridScreen = () => {
  const navigation = useNavigation();

  const icons = [
    { name: 'Events', icon: 'calendar-outline', color: '#FF6B6B', screen: 'EventsScreen' },
    { name: 'Vendors', icon: 'people-outline', color: '#4ECDC4', screen: 'VendorsScreen' },
    { name: 'Budget', icon: 'cash-outline', color: '#45B7D1', screen: 'BudgetScreen' },
    { name: 'Guests', icon: 'person-add-outline', color: '#96CEB4', screen: 'GuestsScreen' },
    { name: 'Tasks', icon: 'checkbox-outline', color: '#FFEEAD', screen: 'TasksScreen' },
    { name: 'Venues', icon: 'location-outline', color: '#D4A5A5', screen: 'VenuesScreen' },
    { name: 'Timeline', icon: 'time-outline', color: '#9B59B6', screen: 'TimelineScreen' },
    { name: 'Notes', icon: 'document-text-outline', color: '#3498DB', screen: 'NotesScreen' },
    { name: 'Settings', icon: 'settings-outline', color: '#E67E22', screen: 'SettingsScreen' },
  ];

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#1C2526',
      padding: 20,
      paddingTop: 40,
    }}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
      }}>
        {icons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}
            style={{
              width: '30%',
              backgroundColor: item.color,
              borderRadius: 20,
              padding: 15,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 6,
            }}
          >
            <Ionicons name={item.icon} size={36} color="#FFFFFF" />
            <Text style={{
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: '600',
              marginTop: 8,
              textAlign: 'center',
            }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
       
      </View>
   
    </View>
  );
};

export default IconGridScreen;