import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Switch, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import FooterNav from './FooterNav';
import { useRouter } from 'expo-router';
import dashboard from './dashboard';
import { useTheme,  } from './utils/themeprovider';
export default function profile() {
    const router = useRouter()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
      const { isDarkTheme, toggleTheme, theme } = useTheme();
    


      useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log("token error here")
          router.push('/login');
          return;
        }

        const response = await api.get('/api/auth/dashboard');

       
        if (response.status === 200) {
          setUser(response.data.data.user);
          console.log(response.data.data.user, "my details")
       
        } else {
          console.log("an error is here 1")
          setError(result.message || 'Failed to fetch dashboard data');
          router.push('/login');
        }
      } catch (err) {
        console.log("an error is here 2")
        setError('Failed to fetch dashboard data');
        console.error('Dashboard fetch error:', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


    const displayEmail = user.email ? user.email.split('@')[0] : 'User';


  return (
    <>
    <View>
      <Text>profile - {displayEmail}</Text>
       <View style={styles.switchContainer}>
                <Text style={[styles.label, { color: theme.textColor }]}>
                  {isDarkTheme ? 'Dark Theme' : 'Light Theme'}
                </Text>
                <Switch
                  value={isDarkTheme}
                  onValueChange={toggleTheme}
                  trackColor={{ false: '#767577', true: '#000080' }}
                  thumbColor={isDarkTheme ? '#FFFFFF' : '#000000'}
                  ios_backgroundColor="#767577"
                  style={styles.switch}
                />
              </View>
     </View>
     <FooterNav />

    </>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000080',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  chartContainer: {
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#000080',
    borderRadius: 12,
    padding: 16,
  },
  box: {
    flex: 1,
    backgroundColor: '#000080',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
  },
  webShadow: {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Already correct for web
  },
  nativeShadow: {
    // Removed deprecated shadow* props
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // elevation: 6,
    // Use boxShadow for consistency across platforms
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Added for native platforms
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
});
