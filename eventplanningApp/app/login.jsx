import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withRepeat } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api"
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const bounce = useSharedValue(0);
  useEffect(() => {
    bounce.value = withRepeat(
      withTiming(20, { duration: 600, easing: Easing.out(Easing.quad) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const response = await api.post('/api/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('role', JSON.stringify(response.data.user.role));
      console.log('Login successful:', response.data);
        Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        text: 'Successfully signed up, please log in',
      });
      router.push('/userdashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };




  return (
  
        <SafeAreaView style={{ flex: 1, backgroundColor:'#1C2526' }}>
      <View style={{ padding: 24, paddingTop: 40 }}>
        <View style={{ alignItems: 'center', marginBottom: 104 }}>
          <Animated.View
            style={[
              {
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#000080',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#4169E1',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              },
              animatedStyle,
            ]}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#4169E1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcons name="event" size={50} color="#FFFFFF" />
            </View>
          </Animated.View>
        </View>
   
        {error ? (
          <Text style={{ color: '#FF4444', marginBottom: 16, textAlign: 'center' }}>{error}</Text>
        ) : null}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 46 }}>
          
           <TextInput
      style={{
        flex: 1,
        backgroundColor: "transparent", 
        borderWidth: 2, 
        borderStyle: "solid", 
        borderColor: "#000080",
        padding: 12,
        borderRadius: 8,
        color: "#ffffff", // White text
        fontSize: 16,
         fontWeight:'bolder'
      }}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         
            <TextInput
                 style={{
        flex: 1,
        backgroundColor: "transparent", 
        borderWidth: 2, 
        borderStyle: "solid", 
        borderColor: "#000080",
        padding: 12,
        borderRadius: 8,
        color: "#ffffff", // White text
        fontSize: 16,
         fontWeight:'bolder'
      }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 12 }}
            >
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color="#87BCFF"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable
          style={{
            backgroundColor: '#000080',
            padding: 18,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            marginTop:7
          }}
          onPress={handleLogin}
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
        <Pressable
          style={{
            marginTop: 16,
            padding: 18,
            borderRadius: 12,
          }}
          onPress={() => router.push('/signup')}
        >
          <Text
            style={{
              color: '#87BCFF',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Don't have an account? Signup
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>

  
  
  );
}