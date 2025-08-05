

















import  { useState, useEffect } from 'react';
import { View, Text, Pressable, Dimensions, ScrollView, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import { useTheme } from './utils/themeprovider';
import { Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import withAuth from './utils/withAuth';
import FooterNav from "./FooterNav"
import Constants from 'expo-constants';
import api from './api';

const screenWidth = Dimensions.get('window').width;
const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL || 'http://localhost:8000'; 

const Userdashboard = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { isDarkTheme, toggleTheme, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({});
  const [dashboardData, setDashboardData] = useState({
    jobStats: [
      { name: 'Completed', value: 60, color: '#87BCFF', legendFontColor: '#FFFFFF', legendFontSize: 14 },
      { name: 'Ongoing', value: 30, color: '#4169E1', legendFontColor: '#FFFFFF', legendFontSize: 14 },
      { name: 'Pending', value: 10, color: '#000080', legendFontColor: '#FFFFFF', legendFontSize: 14 },
    ],
    earnings: { amount: 45.20, location: 'Surulere' },
    jobCount: { count: 12, location: 'Surulere' },
  });

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
          setDashboardData({
            jobStats: response.data.data.jobStats,
            earnings: response.data.data.earnings,
            jobCount: response.data.data.jobCount,
          });
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

  // Pie chart data (use dynamic data from backend)
  const chartData = dashboardData.jobStats;

  // Navigation handler
  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`/${screen}`);
  };

  // Handle navigation errors
  const handleNavigation = (screen) => {
    try {
      navigateTo(screen);
    } catch (error) {
      console.error('Navigation error:', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Failed to navigate. Please try again.',
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
        <ActivityIndicator size="large" color={theme.textColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
        <Text style={{ color: theme.textColor }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      {/* Top Navigation */}
      <View
        style={[
          styles.topNav,
          Platform.OS === 'web' ? styles.webShadow : styles.nativeShadow,
        ]}
      >
        <Pressable
          onPress={() => handleNavigation('settings')}
          style={{
            padding: 10,
            backgroundColor: activeTab === 'settings' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
          }}
        >
          <Icon name="settings" size={24} color={activeTab === 'settings' ? '#FFFFFF' : '#87BCFF'} />
        </Pressable>
        <Pressable
          onPress={() => handleNavigation('notifications')}
          style={{
            padding: 10,
            backgroundColor: activeTab === 'notifications' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
          }}
        >
          <Icon name="notifications" size={24} color={activeTab === 'notifications' ? '#FFFFFF' : '#87BCFF'} />
        </Pressable>
        <Pressable
          onPress={() => handleNavigation('search')}
          style={{
            padding: 10,
            backgroundColor: activeTab === 'search' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
          }}
        >
          <Icon name="search" size={24} color={activeTab === 'search' ? '#FFFFFF' : '#87BCFF'} />
        </Pressable>
      </View>

      {/* Scrollable Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24 }}
      >
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
          Dashboard - {displayEmail}
        </Text>

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

        {/* Pie Chart */}
        <View
          style={[
            styles.chartContainer,
            Platform.OS === 'web' ? styles.webShadow : styles.nativeShadow,
          ]}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#FFFFFF',
              marginBottom: 16,
            }}
          >
            Job Status
          </Text>
          <PieChart
            data={chartData}
            width={screenWidth - 80}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Grid Boxes */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          {/* Earnings Box */}
          <View
            style={[
              styles.box,
              Platform.OS === 'web' ? styles.webShadow : styles.nativeShadow,
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#87BCFF',
                marginBottom: 8,
              }}
            >
              Earnings
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#FFFFFF',
              }}
            >
              ${dashboardData.earnings.amount.toFixed(2)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#FFFFFF',
                opacity: 0.7,
              }}
            >
              Total earnings in {dashboardData.earnings.location}
            </Text>
          </View>

          {/* Job Count Box */}
          <View
            style={[
              styles.box,
              Platform.OS === 'web' ? styles.webShadow : styles.nativeShadow,
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#87BCFF',
                marginBottom: 8,
              }}
            >
              Jobs
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#FFFFFF',
              }}
            >
              {dashboardData.jobCount.count}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#FFFFFF',
                opacity: 0.7,
              }}
            >
              Active jobs in {dashboardData.jobCount.location}
            </Text>
          </View>
        </View>
      </ScrollView>
       <FooterNav/>
    </SafeAreaView>
  );
};

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

export default withAuth(Userdashboard);