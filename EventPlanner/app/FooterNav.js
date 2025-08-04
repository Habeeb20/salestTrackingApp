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
const react_native_1 = require("react-native");
const react_1 = __importStar(require("react"));
const expo_router_1 = require("expo-router");
const react_native_alert_notification_1 = require("react-native-alert-notification");
const MaterialIcons_1 = __importDefault(require("react-native-vector-icons/MaterialIcons"));
const FooterNav = () => {
    const [activeTab, setActiveTab] = (0, react_1.useState)('dashboard');
    const navigateTo = (screen) => {
        setActiveTab(screen);
        expo_router_1.router.push(`/${screen}`); // Ensure correct path format for expo-router
    };
    const handleNavigation = (screen) => {
        try {
            navigateTo(screen);
        }
        catch (error) {
            console.error('Navigation error:', error);
            react_native_alert_notification_1.Toast.show({
                type: react_native_alert_notification_1.ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Failed to navigate. Please try again.',
                autoClose: 3000,
            });
        }
    };
    return (<react_native_1.View style={{
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
        }}>
      <react_native_1.Pressable onPress={() => handleNavigation('dashboard')} style={{
            padding: 10,
            backgroundColor: activeTab === 'dashboard' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
            alignItems: 'center',
        }}>
        <MaterialIcons_1.default name="dashboard" size={24} color={activeTab === 'dashboard' ? '#FFFFFF' : '#87BCFF'}/>
        <react_native_1.Text style={{
            color: activeTab === 'dashboard' ? '#FFFFFF' : '#87BCFF',
            fontSize: 12,
            textAlign: 'center',
        }}>
          Dashboard
        </react_native_1.Text>
      </react_native_1.Pressable>

      <react_native_1.Pressable onPress={() => handleNavigation('actions')} style={{
            padding: 10,
            backgroundColor: activeTab === 'actions' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
            alignItems: 'center',
        }}>
        <MaterialIcons_1.default name="build" size={24} color={activeTab === 'actions' ? '#FFFFFF' : '#87BCFF'}/>
        <react_native_1.Text style={{
            color: activeTab === 'actions' ? '#FFFFFF' : '#87BCFF',
            fontSize: 12,
            textAlign: 'center',
        }}>
          Actions
        </react_native_1.Text>
      </react_native_1.Pressable>

      <react_native_1.Pressable onPress={() => handleNavigation('planners')} style={{
            padding: 10,
            backgroundColor: activeTab === 'planners' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
            alignItems: 'center',
        }}>
        <MaterialIcons_1.default name="event" size={24} color={activeTab === 'planners' ? '#FFFFFF' : '#87BCFF'}/>
        <react_native_1.Text style={{
            color: activeTab === 'planners' ? '#FFFFFF' : '#87BCFF',
            fontSize: 12,
            textAlign: 'center',
        }}>
          Planners
        </react_native_1.Text>
      </react_native_1.Pressable>

      <react_native_1.Pressable onPress={() => handleNavigation('profile')} style={{
            padding: 10,
            backgroundColor: activeTab === 'profile' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
            alignItems: 'center',
        }}>
        <MaterialIcons_1.default name="person" size={24} color={activeTab === 'profile' ? '#FFFFFF' : '#87BCFF'}/>
        <react_native_1.Text style={{
            color: activeTab === 'profile' ? '#FFFFFF' : '#87BCFF',
            fontSize: 12,
            textAlign: 'center',
        }}>
          Profile
        </react_native_1.Text>
      </react_native_1.Pressable>
    </react_native_1.View>);
};
exports.default = FooterNav;
