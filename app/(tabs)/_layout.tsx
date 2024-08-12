import { Link, router, Tabs, useFocusEffect } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import appStore from '~/store/app-store';
import { appRouter, type AnimationPaths } from '~/utils/constants';

export default function TabLayout() {
  const autoNavigate = appStore.autoNavigate.use();
  const currentAnimation: any = appStore.currentAnimation.use();

  useFocusEffect(() => {
    autoNavigate && appRouter.navigateAnimation(currentAnimation);
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
