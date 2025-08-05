import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './utils/themeprovider';
import FooterNav from './FooterNav';

export default function IconGridScreen() {
  const navigation = useNavigation();
  const { theme, isDarkTheme, toggleTheme } = useTheme();

  const icons = [
    { name: 'Events', icon: 'calendar-outline', color: '#FF6B6B', screen: 'EventsScreen' },
    { name: 'Vendors', icon: 'people-outline', color: '#4ECDC4', screen: 'VendorsScreen' },
    { name: 'Budget', icon: 'cash-outline', color: '#45B7D1', screen: 'BudgetScreen' },
    { name: 'Guests', icon: 'person-add-outline', color: '#96CEB4', screen: 'GuestsScreen' },
    { name: 'Tasks', icon: 'checkbox-outline', color: '#FFEEAD', screen: 'TasksScreen' },
    { name: 'Venues', icon: 'location-outline', color: '#D4A5A5', screen: 'VenuesScreen' },
    { name: 'Timeline', icon: 'time-outline', color: '#9B59B6', screen: 'TimelineScreen' },
    { name: 'Notes', icon: 'document-text-outline', color: '#3498DB', screen: 'NotesScreen' },
    { name: 'Settings', icon: 'settings-outline', color: '#E67E22', screen: 'SettingsScreen' },
  ];

  return (
    <>
     <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: theme.textColor }]}>
          {/* Event Planner Dashboard */}
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
      <View style={styles.grid}>
        {icons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}
            style={[
              styles.card,
              { backgroundColor: item.color },
              Platform.OS === 'web' ? styles.webShadow : styles.nativeShadow,
            ]}
            activeOpacity={0.8}
          >
            <Ionicons name={item.icon} size={40} color="#FFFFFF" />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    
    </View>
  <FooterNav />
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    
  },
  card: {
    width: '30%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    transform: [{ scale: 1 }],
  },
  webShadow: {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
  },
  nativeShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
});






















































// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const navigation = useNavigation();
//     const [isLoading, setIsLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//       const checkToken = async () => {
//         try {
//           const token = await AsyncStorage.getItem('authToken');
//           if (token) {
//             setIsAuthenticated(true);
//           } else {
//             navigation.navigate('LoginScreen');
//           }
//         } catch (error) {
//           console.error('Error checking token:', error);
//           navigation.navigate('LoginScreen');
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       checkToken();
//     }, [navigation]);

//     if (isLoading) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }

//     return isAuthenticated ? <WrappedComponent {...props} /> : null;
//   };
// };

// // In IconGridScreen.jsx
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { useTheme } from './utils/ThemeProvider';

// function IconGridScreen() {
//   const navigation = useNavigation();
//   const { theme } = useTheme();

//   const icons = [
//     { name: 'Events', icon: 'calendar-outline', color: '#FF6B6B', screen: 'EventsScreen' },
//     { name: 'Vendors', icon: 'people-outline', color: '#4ECDC4', screen: 'VendorsScreen' },
//     { name: 'Budget', icon: 'cash-outline', color: '#45B7D1', screen: 'BudgetScreen' },
//     { name: 'Guests', icon: 'person-add-outline', color: '#96CEB4', screen: 'GuestsScreen' },
//     { name: 'Tasks', icon: 'checkbox-outline', color: '#FFEEAD', screen: 'TasksScreen' },
//     { name: 'Venues', icon: 'location-outline', color: '#D4A5A5', screen: 'VenuesScreen' },
//     { name: 'Timeline', icon: 'time-outline', color: '#9B59B6', screen: 'TimelineScreen' },
//     { name: 'Notes', icon: 'document-text-outline', color: '#3498DB', screen: 'NotesScreen' },
//     { name: 'Settings', icon: 'settings-outline', color: '#E67E22', screen: 'SettingsScreen' },
//   ];

//   return (
//     <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
//       <Text style={[styles.header, { color: theme.textColor }]}>
//         Event Planner Dashboard
//       </Text>
//       <View style={styles.grid}>
//         {icons.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => navigation.navigate(item.screen)}
//             style={[
//               styles.card,
//               { backgroundColor: item.color },
//               Platform.OS === 'web' ? styles.webShadow : styles.nativeShadow,
//             ]}
//             activeOpacity={0.8}
//           >
//             <Ionicons name={item.icon} size={40} color="#FFFFFF" />
//             <Text style={styles.cardText}>{item.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingTop: 60,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 16,
//   },
//   card: {
//     width: '30%',
//     borderRadius: 16,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//     transform: [{ scale: 1 }],
//   },
//   webShadow: {
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
//   },
//   nativeShadow: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   cardText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//     marginTop: 12,
//     textAlign: 'center',
//   },
// });

// export default withAuth(IconGridScreen);

// // Example LoginScreen.jsx to store token
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const LoginScreen = () => {
//   const navigation = useNavigation();

//   const handleLogin = async () => {
//     const token = 'your-auth-token'; // Replace with actual token from login API
//     try {
//       await AsyncStorage.setItem('authToken', token);
//       navigation.navigate('IconGridScreen');
//     } catch (error) {
//       console.error('Error storing token:', error);
//     }
//   };
//   // ... rest of login component
// };