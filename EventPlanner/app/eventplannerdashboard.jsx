import React, { useState } from 'react';
import { View, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';

const screenWidth = Dimensions.get('window').width;

const Eventplannerdashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Pie chart data (sample job statuses)
  const chartData = [
    { name: 'Completed', value: 60, color: '#87BCFF', legendFontColor: '#FFFFFF', legendFontSize: 14 },
    { name: 'Ongoing', value: 30, color: '#4169E1', legendFontColor: '#FFFFFF', legendFontSize: 14 },
    { name: 'Pending', value: 10, color: '#000080', legendFontColor: '#FFFFFF', legendFontSize: 14 },
  ];

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      {/* Top Navigation */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          backgroundColor: '#000080',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
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
          planner Dashboard
        </Text>

        {/* Pie Chart */}
        <View
          style={{
            marginBottom: 24,
            alignItems: 'center',
            backgroundColor: '#000080',
            borderRadius: 12,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
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
            style={{
              flex: 1,
              backgroundColor: '#000080',
              borderRadius: 12,
              padding: 16,
              marginRight: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
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
              $45.20
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#FFFFFF',
                opacity: 0.7,
              }}
            >
              Total earnings in Surulere
            </Text>
          </View>

          {/* Job Count Box */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#000080',
              borderRadius: 12,
              padding: 16,
              marginLeft: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
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
              12
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#FFFFFF',
                opacity: 0.7,
              }}
            >
              Active jobs in Surulere
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
          backgroundColor: '#000080',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Pressable
          onPress={() => handleNavigation('dashboard')}
          style={{
            padding: 10,
            backgroundColor: activeTab === 'dashboard' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
          }}
        >
          <Icon name="dashboard" size={24} color={activeTab === 'dashboard' ? '#FFFFFF' : '#87BCFF'} />
          <Text
            style={{
              color: activeTab === 'dashboard' ? '#FFFFFF' : '#87BCFF',
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Dashboard
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleNavigation('actions')}
          style={{
            padding: 10,
            backgroundColor: activeTab === 'actions' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
          }}
        >
          <Icon name="build" size={24} color={activeTab === 'actions' ? '#FFFFFF' : '#87BCFF'} />
          <Text
            style={{
              color: activeTab === 'actions' ? '#FFFFFF' : '#87BCFF',
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Actions
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleNavigation('planners')}
          style={{
            padding: 10,
            backgroundColor: activeTab === 'planners' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
          }}
        >
          <Icon name="event" size={24} color={activeTab === 'planners' ? '#FFFFFF' : '#87BCFF'} />
          <Text
            style={{
              color: activeTab === 'planners' ? '#FFFFFF' : '#87BCFF',
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Planners
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleNavigation('profile')}
          style={{
            padding: 10,
            backgroundColor: activeTab === 'profile' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
          }}
        >
          <Icon name="person" size={24} color={activeTab === 'profile' ? '#FFFFFF' : '#87BCFF'} />
          <Text
            style={{
              color: activeTab === 'profile' ? '#FFFFFF' : '#87BCFF',
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Profile
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Eventplannerdashboard;