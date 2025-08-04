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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const expo_router_1 = require("expo-router");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const vector_icons_1 = require("@expo/vector-icons");
const EventCard_1 = __importDefault(require("../components/EventCard"));
const color_1 = require("../ui/theme/color");
const sampleEvents = [
    { id: '1', title: 'Tech Meetup', date: '2025-07-10', location: 'San Francisco' },
    { id: '2', title: 'Music Festival', date: '2025-08-15', location: 'New York' },
];
function HomeScreen() {
    const [events, setEvents] = (0, react_1.useState)(sampleEvents);
    // Animation for bouncing ball
    const bounce = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        bounce.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(20, {
            duration: 600,
            easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.quad),
        }), -1, true // Reverse for bounce effect
        );
    }, []);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateY: bounce.value }],
    }));
    return (<react_native_safe_area_context_1.SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      <react_native_1.View style={{ padding: 24, paddingTop: 40 }}>
        {/* Bouncing Ball with Gradient and Icon */}
        <react_native_1.View style={{ alignItems: 'center', marginBottom: 24 }}>
          <react_native_reanimated_1.default.View style={[
            {
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#000080', // Navy blue base
                justifyContent: 'center',
                alignItems: 'center',
                // Approximate radial gradient with shadow and inner layer
                shadowColor: '#4169E1', // Royal blue
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
            },
            animatedStyle,
        ]}>
            {/* Inner layer for gradient effect */}
            <react_native_1.View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#4169E1', // Royal blue
            justifyContent: 'center',
            alignItems: 'center',
        }}>
              <vector_icons_1.MaterialIcons name="event" size={50} color="#FFFFFF"/>
            </react_native_1.View>
          </react_native_reanimated_1.default.View>
        </react_native_1.View>
        <react_native_1.Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#87BCFF',
            marginBottom: 84,
            textAlign: 'center',
        }}>
          Plan Your Event
        </react_native_1.Text>
        {/* <FlatList
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item) => item.id}
          style={{ marginBottom: 24 }}
        /> */}
        <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <expo_router_1.Link href="/login" asChild>
            <react_native_1.Pressable style={{
            backgroundColor: '#000080',
            padding: 18,
            borderRadius: 12,
            flex: 1,
            marginRight: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        }}>
              <react_native_1.Text style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
        }}>
                Login
              </react_native_1.Text>
            </react_native_1.Pressable>
          </expo_router_1.Link>
          <expo_router_1.Link href="/signup" asChild>
            <react_native_1.Pressable style={{
            backgroundColor: '#4169E1',
            padding: 18,
            borderRadius: 12,
            flex: 1,
            marginLeft: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        }}>
              <react_native_1.Text style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
        }}>
                Signup
              </react_native_1.Text>
            </react_native_1.Pressable>
          </expo_router_1.Link>
        </react_native_1.View>
        <expo_router_1.Link href="/create" asChild>
          <react_native_1.Pressable style={{
            backgroundColor: '#000080',
            padding: 18,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        }}>
            <react_native_1.Text style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
        }}>
              Create New Event
            </react_native_1.Text>
          </react_native_1.Pressable>
        </expo_router_1.Link>
      </react_native_1.View>
    </react_native_safe_area_context_1.SafeAreaView>);
}
