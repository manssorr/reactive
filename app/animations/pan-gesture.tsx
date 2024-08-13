import { StyleSheet, View, type ViewProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface IProps {}
const SquareSize = 100;
const SquareBox = `h-[${SquareSize}px] w-[${SquareSize}px]`;
const baseColor = '#ef4444';

const Square = ({ style, ...restProps }: ViewProps): React.ReactElement<IProps> => {
  return (
    <Animated.View
      className={`${SquareBox} rounded-[30px] bg-red-500`}
      style={[styles.square, style]}
      {...restProps}
    />
  );
};

const PanGesture = (props: IProps): React.ReactElement<IProps> => {
  const traslateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateContext = useSharedValue({ x: 0, y: 0 });
  const isDragging = useSharedValue(false);
  const rotate = useDerivedValue(() => {
    return withSpring(isDragging.value ? 45 : 0);
  }, []);
  const scale = useDerivedValue(() => {
    return withSpring(isDragging.value ? 0.9 : 1);
  }, []);
  const color = useDerivedValue(() => {
    let color = baseColor;
    const isInWhite = translateY.value < 0;
    const isInBlack = translateY.value > 0;

    if (isInWhite) {
      color = 'black';
    } else if (isInBlack) {
      color = 'white';
    }
    return withTiming(isDragging.value ? baseColor : color);
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
      transform: [
        { translateX: traslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      isDragging.value = true;
      translateContext.value = {
        x: traslateX.value,
        y: translateY.value,
      };
    })
    .onUpdate((event) => {
      traslateX.value = translateContext.value.x + event.translationX;
      translateY.value = translateContext.value.y + event.translationY;
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  return (
    <View className="flex-1 items-center justify-center bg-white" {...props}>
      <View className="absolute bottom-0 h-1/2 w-full bg-black" />
      <GestureDetector gesture={panGesture}>
        <Square
          style={[rStyle]}
          onResponderGrant={() => {
            console.log(`onResponderGrant`);

            // rotate.value = withRepeat(withSpring(360), -1, true);
          }}
          onResponderRelease={() => {
            console.log(`onResponderRelease`);
          }}
        />
      </GestureDetector>
    </View>
  );
};

export default PanGesture;

const styles = StyleSheet.create({
  square: {
    borderCurve: 'continuous',
  },
});
