"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventCard;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
function EventCard({ event }) {
    return (<react_native_1.View className="bg-skyBlue p-4 rounded-lg mb-2" style={react_native_1.Platform.OS === 'web' ? { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' } : { elevation: 4 }}>
      <react_native_1.Text className="text-lg font-semibold text-navyBlue">{event.title}</react_native_1.Text>
      <react_native_1.Text className="text-sm text-grokDark">Date: {event.date}</react_native_1.Text>
      <react_native_1.Text className="text-sm text-grokDark">Location: {event.location}</react_native_1.Text>
    </react_native_1.View>);
}
