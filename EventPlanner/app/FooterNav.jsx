import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FooterNav = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`/${screen}`); // Ensure correct path format for expo-router
  };

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
          alignItems: 'center',
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
          alignItems: 'center',
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
          alignItems: 'center',
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
          alignItems: 'center',
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
  );
};

export default FooterNav;