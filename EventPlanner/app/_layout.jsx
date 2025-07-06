import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Events' }} />
      <Stack.Screen name="create" options={{ title: 'Create Event' }} />
    </Stack>
  );
}