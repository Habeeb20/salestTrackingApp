"use strict";
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
exports.default = LoginScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const expo_router_1 = require("expo-router");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const vector_icons_1 = require("@expo/vector-icons");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const api_1 = __importDefault(require("./api"));
const react_native_alert_notification_1 = require("react-native-alert-notification");
function LoginScreen() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)('');
    const router = (0, expo_router_1.useRouter)();
    const bounce = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        bounce.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(20, { duration: 600, easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.quad) }), -1, true);
    }, []);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateY: bounce.value }],
    }));
    const handleLogin = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            const response = yield api_1.default.post('/api/auth/login', { email, password });
            yield async_storage_1.default.setItem('token', response.data.token);
            yield async_storage_1.default.setItem('user', JSON.stringify(response.data.user));
            yield async_storage_1.default.setItem('role', JSON.stringify(response.data.user.role));
            console.log('Login successful:', response.data);
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.SUCCESS,
                title: 'Success',
                text: 'Successfully signed up, please log in',
            });
            if (response.data.user.role === "client") {
                router.push('/dashboard');
            }
            else {
                router.push("/eventplannerdashboard");
            }
        }
        catch (err) {
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Login failed');
        }
    });
    return (<react_native_safe_area_context_1.SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <react_native_1.View style={{ padding: 24, paddingTop: 40 }}>
        <react_native_1.View style={{ alignItems: 'center', marginBottom: 104 }}>
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
   
        {error ? (<react_native_1.Text style={{ color: '#FF4444', marginBottom: 16, textAlign: 'center' }}>{error}</react_native_1.Text>) : null}
        <react_native_1.View style={{ marginBottom: 16 }}>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 46 }}>
          
           <react_native_1.TextInput style={{
            flex: 1,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#000080",
            padding: 12,
            borderRadius: 8,
            color: "#ffffff", // White text
            fontSize: 16,
            fontWeight: 'bolder'
        }} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
          </react_native_1.View>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
         
            <react_native_1.TextInput style={{
            flex: 1,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#000080",
            padding: 12,
            borderRadius: 8,
            color: "#ffffff", // White text
            fontSize: 16,
            fontWeight: 'bolder'
        }} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword}/>
            <react_native_1.TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12 }}>
              <vector_icons_1.MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#87BCFF"/>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.Pressable style={{
            backgroundColor: '#000080',
            padding: 18,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            marginTop: 7
        }} onPress={handleLogin}>
          <react_native_1.Text style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
        }}>
            Login
          </react_native_1.Text>
        </react_native_1.Pressable>
        <react_native_1.Pressable style={{
            marginTop: 16,
            padding: 18,
            borderRadius: 12,
        }} onPress={() => router.push('/signup')}>
          <react_native_1.Text style={{
            color: '#87BCFF',
            textAlign: 'center',
            fontSize: 16,
        }}>
            Don't have an account? Signup
          </react_native_1.Text>
        </react_native_1.Pressable>
      </react_native_1.View>
    </react_native_safe_area_context_1.SafeAreaView>);
}
