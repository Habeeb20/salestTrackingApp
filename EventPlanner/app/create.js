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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateEventScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const expo_router_1 = require("expo-router");
function CreateEventScreen() {
    const [title, setTitle] = (0, react_1.useState)('');
    const [date, setDate] = (0, react_1.useState)('');
    const [location, setLocation] = (0, react_1.useState)('');
    const router = (0, expo_router_1.useRouter)();
    const handleSubmit = () => {
        // TODO: Connect to backend API to save event
        console.log('New Event:', { title, date, location });
        router.push('/');
    };
    return (<react_native_1.View className="flex-1 bg-grokDark p-4">
      <react_native_1.Text className="text-2xl font-bold text-skyBlue mb-4">Create Event</react_native_1.Text>
      <react_native_1.TextInput className="bg-white p-3 rounded-lg.mb-4 text-navyBlue" placeholder="Event Title" value={title} onChangeText={setTitle}/>
      <react_native_1.TextInput className="bg-white p-3 rounded-lg mb-4 text-navyBlue" placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate}/>
      <react_native_1.TextInput className="bg-white p-3 rounded-lg mb-4 text-navyBlue" placeholder="Location" value={location} onChangeText={setLocation}/>
      <react_native_1.Pressable className="bg-navyBlue p-4 rounded-lg" onPress={handleSubmit}>
        <react_native_1.Text className="text-white text-center font-semibold">Save Event</react_native_1.Text>
      </react_native_1.Pressable>
    </react_native_1.View>);
}
