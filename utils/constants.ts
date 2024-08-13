import { router } from 'expo-router';

const AnimationsList = {
  'bouncing-square': 'Animated Square Bouncing',
  'pan-gesture': 'Pan Gesture',
};

export type AnimationPaths = keyof typeof AnimationsList;

export const AnimationsListItems: { path: AnimationPaths; title: string }[] = Object.entries(
  AnimationsList
).map(([key, value]) => ({
  path: key as AnimationPaths,
  title: value,
}));

export const appRouter = {
  navigateAnimation(animation: AnimationPaths) {
    router.navigate({
      pathname: `/animations/${animation}`,
      params: {
        screenTitle: AnimationsList[animation],
      },
    });
  },
};
