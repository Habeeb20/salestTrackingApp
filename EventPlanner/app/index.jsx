import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withRepeat } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import { colors } from '../ui/theme/color';

const sampleEvents = [
  { id: '1', title: 'Tech Meetup', date: '2025-07-10', location: 'San Francisco' },
  { id: '2', title: 'Music Festival', date: '2025-08-15', location: 'New York' },
];

export default function HomeScreen() {
  const [events, setEvents] = useState(sampleEvents);

  // Animation for bouncing ball
  const bounce = useSharedValue(0);
  useEffect(() => {
    bounce.value = withRepeat(
      withTiming(20, {
        duration: 600,
        easing: Easing.out(Easing.quad),
      }),
      -1,
      true // Reverse for bounce effect
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <View style={{ padding: 24, paddingTop: 40 }}>
        {/* Bouncing Ball with Gradient and Icon */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Animated.View
            style={[
              {
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#000080', // Navy blue base
                justifyContent: 'center',
                alignItems: 'center',
                // Approximate radial gradient with shadow and inner layer
                shadowColor: '#4169E1', // Royal blue
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              },
              animatedStyle,
            ]}
          >
            {/* Inner layer for gradient effect */}
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#4169E1', // Royal blue
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcons name="event" size={50} color="#FFFFFF" />
            </View>
          </Animated.View>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#87BCFF',
            marginBottom: 84,
            textAlign: 'center',
          }}
        >
          Plan Your Event
        </Text>
        {/* <FlatList
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item) => item.id}
          style={{ marginBottom: 24 }}
        /> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <Link href="/login" asChild>
            <Pressable
              style={{
                backgroundColor: '#000080',
                padding: 18,
                borderRadius: 12,
                flex: 1,
                marginRight: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            </Pressable>
          </Link>
          <Link href="/signup" asChild>
            <Pressable
              style={{
                backgroundColor:  '#4169E1',
                padding: 18,
                borderRadius: 12,
                flex: 1,
                marginLeft: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                Signup
              </Text>
            </Pressable>
          </Link>
        </View>
        <Link href="/create" asChild>
          <Pressable
            style={{
              backgroundColor: '#000080',
              padding: 18,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              Create New Event
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}