import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { colors } from '../ui/theme/color';

const sampleEvents = [
  { id: '1', title: 'Tech Meetup', date: '2025-07-10', location: 'San Francisco' },
  { id: '2', title: 'Music Festival', date: '2025-08-15', location: 'New York' },
];

export default function HomeScreen() {
  const [events, setEvents] = useState(sampleEvents);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <View style={{ padding: 16 }}>
        {/* Logo at the top */}
        <Image
          source={{ uri: 'https://via.placeholder.com/150x50?text=Event+Planner+Logo' }}
          style={{
            width: 150,
            height: 50,
            alignSelf: 'center',
            marginBottom: 16,
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#87BCFF',
            marginBottom: 16,
          }}
        >
          Event Planner
        </Text>
        <FlatList
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item) => item.id}
          style={{ marginBottom: 16 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Link href="/login" asChild>
            <Pressable
              style={{
                backgroundColor: '#000080',
                padding: 16,
                borderRadius: 8,
                flex: 1,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Login
              </Text>
            </Pressable>
          </Link>
          <Link href="/signup" asChild>
            <Pressable
              style={{
                backgroundColor: '#87BCFF',
                padding: 16,
                borderRadius: 8,
                flex: 1,
                marginLeft: 8,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Signup
              </Text>
            </Pressable>
          </Link>
        </View>
        <View style={{ marginTop: 16 }}>
          <Link href="/create" asChild>
            <Pressable
              style={{
                backgroundColor: '#000080',
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Create New Event
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}