import { Stack } from 'expo-router';
import { Text } from 'react-native';

export const unstable_settings = {
  // initialRouteName: '(drawer)',
};

export default function Home() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bouncing-square" options={{ title: 'Bouncing Square' }} />
    </Stack>
  );
}
