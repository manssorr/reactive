import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { AnimationsListItems, appRouter } from '~/utils/constants';

export default function Home() {
  return (
    <View className="flex-1">
      <FlatList<(typeof AnimationsListItems)[number]>
        data={AnimationsListItems}
        className="flex-1 p-2 "
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => appRouter.navigateAnimation(item.path)}>
            <View className="w-full rounded-2xl bg-cyan-500 p-4">
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
