import { router, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface IProps {}
const SquareSize = 120;

const BouncingSquare = (props: IProps): React.ReactElement<IProps> => {
  const navigation = useNavigation();
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          rotate: `${rotate.value}deg`,
        },
        {
          scale: scale.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: 'Bouncing Square' });
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withRepeat(withTiming(rotate.value + 90), 4, true);
          rotate.value = withTiming(rotate.value + 90);
        }}
        className={` rounded-[30px] bg-blue-500`}
        style={[styles.square, rStyle]}
      />
      <Animated.View style={[styles.square, rStyle]} />
      <TouchableOpacity
        onPress={() => {
          const MaxTranslateAmount = 150;
          const tX = Math.random() * MaxTranslateAmount - MaxTranslateAmount / 2;
          const tY = Math.random() * MaxTranslateAmount - MaxTranslateAmount / 2;
          translateX.value = withSpring(tX);
          translateY.value = withSpring(tY);
        }}
        className="absolute bottom-20 right-8 h-16 w-16 rounded-full bg-[#111]"
      />
    </View>
  );
};

export default BouncingSquare;

const styles = StyleSheet.create({
  square: {
    borderCurve: 'continuous',
    width: SquareSize,
    height: SquareSize,
  },
});
