import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // TODO: Connect to backend API to save event
    console.log('New Event:', { title, date, location });
    router.push('/');
  };

  return (
    <View className="flex-1 bg-grokDark p-4">
      <Text className="text-2xl font-bold text-skyBlue mb-4">Create Event</Text>
      <TextInput
        className="bg-white p-3 rounded-lg.mb-4 text-navyBlue"
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="bg-white p-3 rounded-lg mb-4 text-navyBlue"
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        className="bg-white p-3 rounded-lg mb-4 text-navyBlue"
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Pressable
        className="bg-navyBlue p-4 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">Save Event</Text>
      </Pressable>
    </View>
  );
}