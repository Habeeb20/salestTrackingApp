

import React from 'react';
import { View, Text, Platform } from 'react-native';

export default function EventCard({ event }) {
  return (
    <View
      className="bg-skyBlue p-4 rounded-lg mb-2"
      style={Platform.OS === 'web' ? { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' } : { elevation: 4 }}
    >
      <Text className="text-lg font-semibold text-navyBlue">{event.title}</Text>
      <Text className="text-sm text-grokDark">Date: {event.date}</Text>
      <Text className="text-sm text-grokDark">Location: {event.location}</Text>
    </View>
  );
}