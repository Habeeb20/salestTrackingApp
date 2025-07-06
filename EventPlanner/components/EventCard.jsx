import React from 'react';
import { View, Text } from 'react-native';

export default function EventCard({ event }) {
  return (
    <View className="bg-skyBlue p-4 rounded-lg mb-2 shadow-md">
      <Text className="text-lg font-semibold text-navyBlue">{event.title}</Text>
      <Text className="text-sm text-grokDark">Date: {event.date}</Text>
      <Text className="text-sm text-grokDark">Location: {event.location}</Text>
    </View>
  );
}