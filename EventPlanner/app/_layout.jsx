import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';


// Configure NativeWindStyleSheet for native output
if (NativeWindStyleSheet && typeof NativeWindStyleSheet.setOutput === 'function') {
  NativeWindStyleSheet.setOutput({
    default: 'native',
  });
}

export default function Layout() {
  return (
 
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Plan Your Events',
            headerStyle: { backgroundColor: '#4169E1' },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#fff' },
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            title: 'Create Event',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: 'Signup',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="verifyemail"
          options={{
            title: 'Verify Your Email',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        />
        {/* <Stack.Screen
          name="userDashboard"
          options={{
            title: 'Dashboard',
            headerStyle: { backgroundColor: '#1C2526' },
            headerTitleStyle: { fontSize: 28, fontWeight: 'bold', color: '#87BCFF' },
            headerTintColor: '#87BCFF',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        /> */}
      </Stack>
  
 
  );
}