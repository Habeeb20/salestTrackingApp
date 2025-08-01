// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Pressable, TouchableOpacity, Platform, ActivityIndicator  } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withRepeat } from 'react-native-reanimated';
// import { MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from './api';
// import Toast from 'react-native-toast-message';

// export default function SignupScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('client');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);


//   const bounce = useSharedValue(0);
//   useEffect(() => {
//     bounce.value = withRepeat(
//       withTiming(20, { duration: 600, easing: Easing.out(Easing.quad) }),
//       -1,
//       true
//     );
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: bounce.value }],
//   }));

//   const handleSignup = async () => {
//     if (!email || !password || !role) {
//         Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Please fill in all fields',
//         position: 'top',
//         visibilityTime: 3000,
//       });
//       setError('Please fill in all fields');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await api.post('/api/auth/register', { email, password, role });
//       await AsyncStorage.setItem('token', response.data.token);
//       await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
//       console.log('Signup successful:', response.data);
//       Toast.show({
//         type:'success',
//         text1:'Success',
//         text2:'Signup successful! welcome aboard',
//         position:'top',
//         visibilityTime:3000
//       })
//       router.push('/login');
//     } catch (err) {
//         Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: err.response?.data?.error || 'Signup failed. Please try again.',
//         position: 'top',
//         visibilityTime: 3000,
//       });
//       setError(err.response?.data?.error || 'Signup failed');
//       } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
//       <View style={{ padding: 24, paddingTop: 40 }}>
//         <View style={{ alignItems: 'center', marginBottom: 24 }}>
//           <Animated.View
//             style={[
//               {
//                 width: 120,
//                 height: 120,
//                 borderRadius: 60,
//                 backgroundColor: '#000080',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 shadowColor: '#4169E1',
//                 shadowOffset: { width: 0, height: 0 },
//                 shadowOpacity: 0.6,
//                 shadowRadius: 20,
//                 elevation: 10,
//               },
//               animatedStyle,
//             ]}
//           >
//             <View
//               style={{
//                 width: 100,
//                 height: 100,
//                 borderRadius: 50,
//                 backgroundColor: '#4169E1',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <MaterialIcons name="event" size={50} color="#FFFFFF" />
//             </View>
//           </Animated.View>
//         </View>
//         <Text
//           style={{
//             fontSize: 28,
//             fontWeight: 'bold',
//             color: '#87BCFF',
//             marginBottom: 24,
//             textAlign: 'center',
//           }}
//         >
      
//         </Text>
//         {error ? (
//           <Text style={{ color: '#FF4444', marginBottom: 16, textAlign: 'center' }}>{error}</Text>
//         ) : null}
//         <View style={{ marginBottom: 16 }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>

//             <TextInput
//                       style={{
//         flex: 1,
//         backgroundColor: "transparent", 
//         borderWidth: 2, 
//         borderStyle: "solid", 
//         borderColor: "#000080",
//         padding: 12,
//         borderRadius: 8,
//         color: "#ffffff", // White text
//         fontSize: 16,
//         fontWeight:'bolder'
//       }}
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>

//               <TextInput
//                       style={{
//         flex: 1,
//         backgroundColor: "transparent", 
//         borderWidth: 2, 
//         borderStyle: "solid", 
//         borderColor: "#000080",
//         padding: 12,
//         borderRadius: 8,
//         color: "#ffffff", // White text
//         fontSize: 16,
//         fontWeight:'bold'
//       }}
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={{ position: 'absolute', right: 12 }}
//             >
//               <MaterialIcons
//                 name={showPassword ? 'visibility' : 'visibility-off'}
//                 size={24}
//                 color="#87BCFF"
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>

//             <View
//               style={{
                        
//         flex: 1,
//         backgroundColor: "#fff", 
//         borderWidth: 2, 
//         borderStyle: "solid", 
//         borderColor: "#000080",
//         padding: 12,
//         borderRadius: 8,
       
//         fontSize: 16,
//         fontWeight:'bold'
//               }}
//             >
//               <Picker
//                 selectedValue={role}
//                 onValueChange={(itemValue) => setRole(itemValue)}
//                 style={{
//                   color: '#000080',
//                   fontSize: 16,
//                   border:'none'
//                 }}
//               >
//                 <Picker.Item label="client" value="client" />
//                 <Picker.Item label="event planner" value="event planner" />
//               </Picker>
//             </View>
//           </View>
//         </View>
//         <Pressable
//           style={{
//           backgroundColor: '#000080',
//             padding: 18,
//             borderRadius: 12,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 4,
//             elevation: 5,
//           }}
//           onPress={handleSignup}
//           disabled={loading}
//         >
//               {loading ? (
//             <ActivityIndicator size="small" color="#FFFFFF" />
//           ) : (
//             <Text
//               style={{
//                 color: '#FFFFFF',
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 fontSize: 16,
//               }}
//             >
//             Signup
//           </Text>
//           )}
//         </Pressable>
//         <Pressable
//           style={{
//             marginTop: 16,
//             padding: 18,
//             borderRadius: 12,
//           }}
//           onPress={() => router.push('/login')}
//         >
//           <Text
//             style={{
//               color: '#87BCFF',
//               textAlign: 'center',
//               fontSize: 16,
//             }}
//           >
//             Already have an account? Login
//           </Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }








































































import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withRepeat } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from './api';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSignup = async () => {
    if (!email || !password || !role) {
          Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          text: 'Please fill all fields',
      });
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/api/auth/register', { email, password, role });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('email', JSON.stringify(response.data.email));
      await AsyncStorage.setItem('role', JSON.stringify(response.data.role));
        Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        text: 'Successfully signed up, please log in',
      });
      router.push('/verifyemail');
    } catch (err) {
         Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          text: 'Please fill all fields',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
 
         <SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <View style={{ padding: 24, paddingTop: 40 }}>
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
              <MaterialIcons name="event" size={50} color="#FFFFFF" />
            </View>
          </Animated.View>
        </View>
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
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "transparent",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: "#000080",
                padding: 12,
                borderRadius: 8,
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 'bolder'
              }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "transparent",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: "#000080",
                padding: 12,
                borderRadius: 8,
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 'bold'
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: "#000080",
                padding: 12,
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={{
                  color: '#000080',
                  fontSize: 16,
                  border: 'none'
                }}
              >
                <Picker.Item label="client" value="client" />
                <Picker.Item label="event planner" value="event planner" />
              </Picker>
            </View>
          </View>
        </View>
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
            alignItems: 'center'
          }}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
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
              Signup
            </Text>
          )}
        </Pressable>
        <Pressable
          style={{
            marginTop: 16,
            padding: 18,
            borderRadius: 12,
          }}
          onPress={() => router.push('/login')}
        >
          <Text
            style={{
              color: '#87BCFF',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>


 
  );
}
