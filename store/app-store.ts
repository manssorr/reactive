import { store } from '@davstack/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

import type { AnimationPaths } from '~/utils/constants';

const appStore = store(
  { autoNavigate: false, currentAnimation: '' as AnimationPaths | string },
  {
    persist: {
      enabled: true,
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    },

    name: 'app-store',
  }
).actions((store) => ({
  toggleAutoNavigate: () => store.autoNavigate.set(!store.autoNavigate.get()),
  changeCurrentAnimation: (value?: string) => store.currentAnimation.set(value ?? ''),
}));
// .computed((store) => ({
// 	doubleCount: () => store.count.use() * 2,
// }))
// .effects((store) => ({
// }))

export default appStore;
