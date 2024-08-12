import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Switch, Text, View, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import appStore from '~/store/app-store';
import { AnimationsListItems } from '~/utils/constants';

export default function Modal() {
  const autoNavigate = appStore.autoNavigate.use();
  const currentAnimation = appStore.currentAnimation.use();
  console.log(`currentAnimation`, currentAnimation);
  const onSelectScreen = (item: { label?: string; value?: string }) =>
    appStore.changeCurrentAnimation(item.value);

  const onAutoNavigate = (value: boolean) => appStore.toggleAutoNavigate();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentAnimation);
  const [items, setItems] = useState(
    AnimationsListItems.map((item) => ({ label: item.title, value: item.path }))
  );

  console.log(AnimationsListItems.flatMap((i) => i.title));

  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <SafeAreaView>
        <View className="flex flex-row items-center justify-between rounded-md bg-slate-400 p-2">
          <Text>Dark Mode</Text>
          <Switch value={autoNavigate} onValueChange={onAutoNavigate} />
        </View>
        <View className="flex flex-col items-center justify-between rounded-md bg-slate-400 p-2">
          <Text className="self-start text-lg"> Auto Navigate to animate</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onSelectItem={onSelectScreen}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
