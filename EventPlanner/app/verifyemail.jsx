import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, createRef } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withRepeat } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import api from './api';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [role, setRole] = useState('');
  const router = useRouter();
  const inputRefs = otp.map(() => createRef());

  // Animation for logo
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

  // Retrieve role from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          setRole(user.role || '');
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'No user data found. Please sign up again.',
            autoClose: 3000,
          });
          router.push('/signup');
        }
      } catch (error) {
        console.error('Error retrieving user from AsyncStorage:', error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Failed to load user data',
          autoClose: 3000,
        });
      }
    };
    fetchUserData();
  }, [router]);

  // Handle OTP input
  const handleOtpChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otp.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
    if (!text && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some((digit) => !digit)) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please enter all OTP digits',
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const code = otp.join('');
      console.log('OTP code:', code);

      // Retrieve and validate email from AsyncStorage
      const userEmail = await AsyncStorage.getItem('email');
      console.log('Raw email from AsyncStorage:', userEmail);

      if (!userEmail) {
        throw new Error('Email not found in AsyncStorage');
      }

      // Parse JSON string if necessary
      let email;
      try {
        email = JSON.parse(userEmail); // Handle JSON-serialized string
      } catch (parseError) {
        email = userEmail; // Assume plain string if parsing fails
      }

      // Validate email is a string
      if (typeof email !== 'string') {
        throw new Error('Email is not a string: ' + JSON.stringify(email));
      }

      email = email.trim();
      console.log('Processed email:', email);

      // Log payload before sending
      const payload = { email, code };
      console.log('Sending request with:', payload);

      // Make API request
      const response = await api.post('/api/auth/verify-email', payload);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Email verified successfully!',
        autoClose: 3000,
      });
      router.push('/login');
    } catch (error) {
      console.error('Verification error:', error.message || error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.response?.data?.message || 'Verification failed',
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    try {
      // Retrieve email for resend
      const userEmail = await AsyncStorage.getItem('email');
      if (!userEmail) {
        throw new Error('Email not found in AsyncStorage');
      }
      let email;
      try {
        email = JSON.parse(userEmail);
      } catch (parseError) {
        email = userEmail;
      }
      if (typeof email !== 'string') {
        throw new Error('Email is not a string: ' + JSON.stringify(email));
      }
      email = email.trim();

      await api.post('/api/auth/send-otp', { email }); // Adjust endpoint if needed
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Verification code resent successfully',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Resend OTP error:', error.message || error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.response?.data?.message || 'Failed to resend OTP',
        autoClose: 3000,
      });
    }
  };

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <View style={{ padding: 24, paddingTop: 40 }}>
        {/* Animated Logo */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
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
              <MaterialIcons name="email" size={50} color="#FFFFFF" />
            </View>
          </Animated.View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#87BCFF',
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
      
        </Text>

        {/* OTP Inputs */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
            marginTop:20
          }}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={{
                width: 40,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#000080',
                padding: 8,
                borderRadius: 8,
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginHorizontal: 4,
              }}
              placeholder="0"
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              accessibilityLabel={`OTP digit ${index + 1}`}
            />
          ))}
        </View>

        {/* Submit Button */}
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleVerify}
          disabled={isSubmitting}
          accessibilityLabel="Verify email button"
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text
              style={{
                color: '#FFFFFF',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              Verify
            </Text>
          )}
        </Pressable>

        {/* Resend OTP */}
        <Pressable
          style={{
            marginTop: 16,
            padding: 18,
            borderRadius: 12,
          }}
          onPress={handleResend}
          disabled={resendCooldown > 0}
          accessibilityLabel={resendCooldown > 0 ? `Resend OTP in ${resendCooldown} seconds` : 'Resend OTP'}
        >
          <Text
            style={{
              color: resendCooldown > 0 ? '#666' : '#87BCFF',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;