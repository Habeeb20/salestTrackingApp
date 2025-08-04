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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const expo_router_1 = require("expo-router");
const MaterialIcons_1 = __importDefault(require("react-native-vector-icons/MaterialIcons"));
const react_native_chart_kit_1 = require("react-native-chart-kit");
const react_native_alert_notification_1 = require("react-native-alert-notification");
const screenWidth = react_native_1.Dimensions.get('window').width;
const Eventplannerdashboard = () => {
    const router = (0, expo_router_1.useRouter)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('dashboard');
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
    return (<react_native_safe_area_context_1.SafeAreaView style={{ flex: 1, backgroundColor: '#1C2526' }}>
      {/* Top Navigation */}
      <react_native_1.View style={{
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
        }}>
        <react_native_1.Pressable onPress={() => handleNavigation('settings')} style={{
            padding: 10,
            backgroundColor: activeTab === 'settings' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
        }}>
          <MaterialIcons_1.default name="settings" size={24} color={activeTab === 'settings' ? '#FFFFFF' : '#87BCFF'}/>
        </react_native_1.Pressable>
        <react_native_1.Pressable onPress={() => handleNavigation('notifications')} style={{
            padding: 10,
            backgroundColor: activeTab === 'notifications' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
        }}>
          <MaterialIcons_1.default name="notifications" size={24} color={activeTab === 'notifications' ? '#FFFFFF' : '#87BCFF'}/>
        </react_native_1.Pressable>
        <react_native_1.Pressable onPress={() => handleNavigation('search')} style={{
            padding: 10,
            backgroundColor: activeTab === 'search' ? '#87BCFF' : 'transparent',
            borderRadius: 8,
        }}>
          <MaterialIcons_1.default name="search" size={24} color={activeTab === 'search' ? '#FFFFFF' : '#87BCFF'}/>
        </react_native_1.Pressable>
      </react_native_1.View>

      {/* Scrollable Main Content */}
      <react_native_1.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
        {/* Title */}
        <react_native_1.Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#87BCFF',
            marginBottom: 24,
            textAlign: 'center',
        }}>
          planner Dashboard
        </react_native_1.Text>

        {/* Pie Chart */}
        <react_native_1.View style={{
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
        }}>
          <react_native_1.Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: 16,
        }}>
            Job Status
          </react_native_1.Text>
          <react_native_chart_kit_1.PieChart data={chartData} width={screenWidth - 80} height={220} chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }} accessor="value" backgroundColor="transparent" paddingLeft="15" absolute/>
        </react_native_1.View>

        {/* Grid Boxes */}
        <react_native_1.View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
        }}>
          {/* Earnings Box */}
          <react_native_1.View style={{
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
        }}>
            <react_native_1.Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#87BCFF',
            marginBottom: 8,
        }}>
              Earnings
            </react_native_1.Text>
            <react_native_1.Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF',
        }}>
              $45.20
            </react_native_1.Text>
            <react_native_1.Text style={{
            fontSize: 14,
            color: '#FFFFFF',
            opacity: 0.7,
        }}>
              Total earnings in Surulere
            </react_native_1.Text>
          </react_native_1.View>

          {/* Job Count Box */}
          <react_native_1.View style={{
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
        }}>
            <react_native_1.Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#87BCFF',
            marginBottom: 8,
        }}>
              Jobs
            </react_native_1.Text>
            <react_native_1.Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF',
        }}>
              12
            </react_native_1.Text>
            <react_native_1.Text style={{
            fontSize: 14,
            color: '#FFFFFF',
            opacity: 0.7,
        }}>
              Active jobs in Surulere
            </react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.ScrollView>

      {/* Bottom Navigation */}
      <react_native_1.View style={{
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
      </react_native_1.View>
    </react_native_safe_area_context_1.SafeAreaView>);
};
exports.default = Eventplannerdashboard;
