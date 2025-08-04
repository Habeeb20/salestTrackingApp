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
const react_native_1 = require("react-native");
const react_1 = __importStar(require("react"));
const expo_router_1 = require("expo-router");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const vector_icons_1 = require("@expo/vector-icons");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_native_alert_notification_1 = require("react-native-alert-notification");
const api_1 = __importDefault(require("./api"));
const VerifyEmail = () => {
    const [otp, setOtp] = (0, react_1.useState)(['', '', '', '', '', '']);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [resendCooldown, setResendCooldown] = (0, react_1.useState)(0);
    const [role, setRole] = (0, react_1.useState)('');
    const router = (0, expo_router_1.useRouter)();
    const inputRefs = otp.map(() => (0, react_1.createRef)());
    // Animation for logo
    const bounce = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        bounce.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(20, { duration: 600, easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.quad) }), -1, true);
    }, []);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateY: bounce.value }],
    }));
    // Retrieve role from AsyncStorage
    (0, react_1.useEffect)(() => {
        const fetchUserData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userString = yield async_storage_1.default.getItem('user');
                if (userString) {
                    const user = JSON.parse(userString);
                    setRole(user.role || '');
                }
                else {
                    react_native_alert_notification_1.Toast.show({
                        type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: 'No user data found. Please sign up again.',
                        autoClose: 3000,
                    });
                    router.push('/signup');
                }
            }
            catch (error) {
                console.error('Error retrieving user from AsyncStorage:', error);
                react_native_alert_notification_1.Toast.show({
                    type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Failed to load user data',
                    autoClose: 3000,
                });
            }
        });
        fetchUserData();
    }, [router]);
    // Handle OTP input
    const handleOtpChange = (text, index) => {
        var _a, _b;
        if (!/^\d?$/.test(text))
            return;
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text && index < otp.length - 1) {
            (_a = inputRefs[index + 1].current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        if (!text && index > 0) {
            (_b = inputRefs[index - 1].current) === null || _b === void 0 ? void 0 : _b.focus();
        }
    };
    const handleVerify = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (otp.some((digit) => !digit)) {
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
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
            const userEmail = yield async_storage_1.default.getItem('email');
            console.log('Raw email from AsyncStorage:', userEmail);
            if (!userEmail) {
                throw new Error('Email not found in AsyncStorage');
            }
            // Parse JSON string if necessary
            let email;
            try {
                email = JSON.parse(userEmail); // Handle JSON-serialized string
            }
            catch (parseError) {
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
            const response = yield api_1.default.post('/api/auth/verify-email', payload);
            yield async_storage_1.default.setItem('token', response.data.token);
            yield async_storage_1.default.setItem('user', JSON.stringify(response.data.user));
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Email verified successfully!',
                autoClose: 3000,
            });
            router.push('/login');
        }
        catch (error) {
            console.error('Verification error:', error.message || error);
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Verification failed',
                autoClose: 3000,
            });
        }
        finally {
            setIsSubmitting(false);
        }
    });
    // Handle resend OTP
    const handleResend = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (resendCooldown > 0)
            return;
        setResendCooldown(60);
        try {
            // Retrieve email for resend
            const userEmail = yield async_storage_1.default.getItem('email');
            if (!userEmail) {
                throw new Error('Email not found in AsyncStorage');
            }
            let email;
            try {
                email = JSON.parse(userEmail);
            }
            catch (parseError) {
                email = userEmail;
            }
            if (typeof email !== 'string') {
                throw new Error('Email is not a string: ' + JSON.stringify(email));
            }
            email = email.trim();
            yield api_1.default.post('/api/auth/send-otp', { email }); // Adjust endpoint if needed
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Verification code resent successfully',
                autoClose: 3000,
            });
        }
        catch (error) {
            console.error('Resend OTP error:', error.message || error);
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to resend OTP',
                autoClose: 3000,
            });
        }
    });
    // Cooldown timer
    (0, react_1.useEffect)(() => {
        if (resendCooldown > 0) {
            const timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendCooldown]);
    return (<react_native_safe_area_context_1.SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <react_native_1.View style={{ padding: 24, paddingTop: 40 }}>
        {/* Animated Logo */}
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
              <vector_icons_1.MaterialIcons name="email" size={50} color="#FFFFFF"/>
            </react_native_1.View>
          </react_native_reanimated_1.default.View>
        </react_native_1.View>

        {/* Title */}
        <react_native_1.Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#87BCFF',
            marginBottom: 24,
            textAlign: 'center',
        }}>
      
        </react_native_1.Text>

        {/* OTP Inputs */}
        <react_native_1.View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
            marginTop: 20
        }}>
          {otp.map((digit, index) => (<react_native_1.TextInput key={index} ref={inputRefs[index]} style={{
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
            }} placeholder="0" value={digit} onChangeText={(text) => handleOtpChange(text, index)} keyboardType="numeric" maxLength={1} accessibilityLabel={`OTP digit ${index + 1}`}/>))}
        </react_native_1.View>

        {/* Submit Button */}
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
            alignItems: 'center',
        }} onPress={handleVerify} disabled={isSubmitting} accessibilityLabel="Verify email button">
          {isSubmitting ? (<react_native_1.ActivityIndicator size="small" color="#FFFFFF"/>) : (<react_native_1.Text style={{
                color: '#FFFFFF',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
            }}>
              Verify
            </react_native_1.Text>)}
        </react_native_1.Pressable>

        {/* Resend OTP */}
        <react_native_1.Pressable style={{
            marginTop: 16,
            padding: 18,
            borderRadius: 12,
        }} onPress={handleResend} disabled={resendCooldown > 0} accessibilityLabel={resendCooldown > 0 ? `Resend OTP in ${resendCooldown} seconds` : 'Resend OTP'}>
          <react_native_1.Text style={{
            color: resendCooldown > 0 ? '#666' : '#87BCFF',
            textAlign: 'center',
            fontSize: 16,
        }}>
            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
          </react_native_1.Text>
        </react_native_1.Pressable>
      </react_native_1.View>
    </react_native_safe_area_context_1.SafeAreaView>);
};
exports.default = VerifyEmail;
