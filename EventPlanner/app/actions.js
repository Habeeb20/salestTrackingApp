"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const native_1 = require("@react-navigation/native");
const vector_icons_1 = require("@expo/vector-icons");
const FooterNav_1 = __importDefault(require("./FooterNav"));
const IconGridScreen = () => {
    const navigation = (0, native_1.useNavigation)();
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
    return (<react_native_1.View style={{
            flex: 1,
            backgroundColor: '#1C2526',
            padding: 20,
            paddingTop: 40,
        }}>
      <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 10,
        }}>
        {icons.map((item, index) => (<react_native_1.TouchableOpacity key={index} onPress={() => navigation.navigate(item.screen)} style={{
                width: '30%',
                backgroundColor: item.color,
                borderRadius: 20,
                padding: 15,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 6,
            }}>
            <vector_icons_1.Ionicons name={item.icon} size={36} color="#FFFFFF"/>
            <react_native_1.Text style={{
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: '600',
                marginTop: 8,
                textAlign: 'center',
            }}>
              {item.name}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>))}
       
      </react_native_1.View>
   
    </react_native_1.View>);
};
exports.default = IconGridScreen;
