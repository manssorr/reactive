import '../global.css';
import { PersistGate } from '@colorfy-software/zfy';
import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HeaderButton } from '~/components/HeaderButton';
import Loader from '~/components/Loader';
import AppStore from '~/store/app-store';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

function RootLayout() {
  return (
    <Stack
      screenOptions={(props) => {
        return {
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),

          // headerTitleAlign: 'center',
          headerTitle: ({ children }) => {
            return (
              <Text className="text-xl font-bold">
                {/* @ts-ignore */}
                {props?.route?.params?.screenTitle ??
                  // @ts-ignore
                  props?.route?.params?.screen ??
                  children ??
                  'Unkown'}
              </Text>
            );
          },
        };
      }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootProvider() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayout />
    </GestureHandlerRootView>
  );
}
