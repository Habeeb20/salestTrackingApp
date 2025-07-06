import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';
import EventCard from '../components/EventCard';
import { colors } from '../ui/theme/color';

const sampleEvents = [
  { id: '1', title: 'Tech Meetup', date: '2025-07-10', location: 'San Francisco' },
  { id: '2', title: 'Music Festival', date: '2025-08-15', location: 'New York' },
];

export default function HomeScreen() {
  const [events, setEvents] = useState(sampleEvents);

  return (
    <View className="flex-1 bg-grokDark p-4">
      <Text className="text-2xl font-bold text-skyBlue mb-4">Event Planner</Text>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        className="mb-4"
      />
      <Link href="/create" asChild>
        <Pressable className="bg-navyBlue p-4 rounded-lg">
          <Text className="text-white text-center font-semibold">Create New Event</Text>
        </Pressable>
      </Link>
    </View>
  );
}