"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layout;
const expo_router_1 = require("expo-router");
const nativewind_1 = require("nativewind");
const FooterNav_1 = __importDefault(require("./FooterNav"));
// Configure NativeWindStyleSheet for native output
if (nativewind_1.NativeWindStyleSheet && typeof nativewind_1.NativeWindStyleSheet.setOutput === 'function') {
    nativewind_1.NativeWindStyleSheet.setOutput({
        default: 'native',
    });
}
function Layout() {
    return (<>
      <expo_router_1.Stack>
        <expo_router_1.Stack.Screen name="index" options={{
            title: 'Plan Your Events',
            headerStyle: { backgroundColor: '#4169E1' },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#fff' },
        }}/>
        <expo_router_1.Stack.Screen name="create" options={{
            title: 'Create Event',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
        }}/>
        <expo_router_1.Stack.Screen name="login" options={{
            title: 'Login',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
        }}/>
        <expo_router_1.Stack.Screen name="signup" options={{
            title: 'Signup',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
        }}/>
        <expo_router_1.Stack.Screen name="verifyemail" options={{
            title: 'Verify Your Email',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
        }}/>
        <expo_router_1.Stack.Screen name="dashboard" options={{
            title: 'Dashboard',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
        }}/>

        <expo_router_1.Stack.Screen name='actions' options={{
            title: 'Actions',
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
        }}/>
      
      </expo_router_1.Stack>
  <FooterNav_1.default />
 </>);
}
