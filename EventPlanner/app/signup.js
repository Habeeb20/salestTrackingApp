"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupScreen;
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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const picker_1 = require("@react-native-picker/picker");
const expo_router_1 = require("expo-router");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const vector_icons_1 = require("@expo/vector-icons");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const api_1 = __importDefault(require("./api"));
const react_native_alert_notification_1 = require("react-native-alert-notification");
function SignupScreen() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [role, setRole] = (0, react_1.useState)('client');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const router = (0, expo_router_1.useRouter)();
    const bounce = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        bounce.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(20, { duration: 600, easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.quad) }), -1, true);
    }, []);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateY: bounce.value }],
    }));
    const handleSignup = () => __awaiter(this, void 0, void 0, function* () {
        if (!email || !password || !role) {
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
                title: 'Error',
                text: 'Please fill all fields',
            });
            return;
        }
        setLoading(true);
        try {
            const response = yield api_1.default.post('/api/auth/register', { email, password, role });
            yield async_storage_1.default.setItem('token', response.data.token);
            yield async_storage_1.default.setItem('user', JSON.stringify(response.data.user));
            yield async_storage_1.default.setItem('email', JSON.stringify(response.data.email));
            yield async_storage_1.default.setItem('role', JSON.stringify(response.data.role));
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.SUCCESS,
                title: 'Success',
                text: 'Successfully signed up, please log in',
            });
            router.push('/verifyemail');
        }
        catch (err) {
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
                title: 'Error',
                text: 'Please fill all fields',
            });
        }
        finally {
            setLoading(false);
        }
    });
    return (<react_native_safe_area_context_1.SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <react_native_1.View style={{ padding: 24, paddingTop: 40 }}>
        <react_native_1.View style={{ alignItems: 'center', marginBottom: 24 }}>
          <react_native_reanimated_1.default.View style={[
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
        ]}>
            <react_native_1.View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#4169E1',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
              <vector_icons_1.MaterialIcons name="event" size={50} color="#FFFFFF"/>
            </react_native_1.View>
          </react_native_reanimated_1.default.View>
        </react_native_1.View>
        <react_native_1.Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#87BCFF',
            marginBottom: 24,
            textAlign: 'center',
        }}>
        </react_native_1.Text>
        <react_native_1.View style={{ marginBottom: 16 }}>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <react_native_1.TextInput style={{
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
        }} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
          </react_native_1.View>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <react_native_1.TextInput style={{
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
        }} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword}/>
            <react_native_1.TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12 }}>
              <vector_icons_1.MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#87BCFF"/>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.View style={{
            flex: 1,
            backgroundColor: "#fff",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#000080",
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 'bold'
        }}>
              <picker_1.Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} style={{
            color: '#000080',
            fontSize: 16,
            border: 'none'
        }}>
                <picker_1.Picker.Item label="client" value="client"/>
                <picker_1.Picker.Item label="event planner" value="event planner"/>
              </picker_1.Picker>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.Pressable style={{
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
        }} onPress={handleSignup} disabled={loading}>
          {loading ? (<react_native_1.ActivityIndicator size="small" color="#FFFFFF"/>) : (<react_native_1.Text style={{
                color: '#FFFFFF',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
            }}>
              Signup
            </react_native_1.Text>)}
        </react_native_1.Pressable>
        <react_native_1.Pressable style={{
            marginTop: 16,
            padding: 18,
            borderRadius: 12,
        }} onPress={() => router.push('/login')}>
          <react_native_1.Text style={{
            color: '#87BCFF',
            textAlign: 'center',
            fontSize: 16,
        }}>
            Already have an account? Login
          </react_native_1.Text>
        </react_native_1.Pressable>
      </react_native_1.View>
    </react_native_safe_area_context_1.SafeAreaView>);
}
