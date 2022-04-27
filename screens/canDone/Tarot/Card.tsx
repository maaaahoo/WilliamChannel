import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Gesture, GestureDetector, PanGestureHandler, PanGestureHandlerStateChangeEvent } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

const { width: wWidth, height } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  shuffleBack: Animated.SharedValue<boolean>;
  index: number;
};

const Card: React.FC<CardProps> = props => {
  const {card: {source}, shuffleBack, index} = props;
  const x = useSharedValue(0);
  const y = useSharedValue(-height);

  const theta = Math.random() * 20 - 10;
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);

  useAnimatedReaction(() => shuffleBack.value, () => {
    if (shuffleBack.value) {
      const delay = 150 * index;
      x.value = withDelay(delay, withSpring(0));
      rotateZ.value = withDelay(delay, withSpring(theta, {}, ()=> {
        shuffleBack.value = false;
      }));
    }
  });

  useEffect(() => {
    const delay = 1000 + index * DURATION;
    y.value = withDelay(
      delay,
      withTiming(0, {duration: DURATION})
    );
    rotateZ.value = withDelay(
      delay,
      withTiming(theta, {duration: DURATION})
    );
  }, [index, y])

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerStateChangeEvent, { x: number, y: number }>({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
      scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
      rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + translationX;
      y.value = ctx.y + translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(x.value, velocityX, SNAP_POINTS);
      x.value = withSpring(dest, {
        velocity: velocityX
      });
      y.value = withSpring(0, {velocity: velocityY});
      scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) }, () => {
        if (index === 0 && dest !== 0) {
          shuffleBack.value = true;
        }
      });
    }
  })

  const style = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1500},
      {rotateX: "30deg"},
      {rotateZ: `${rotateZ.value}deg`},
      {translateX: x.value},
      {translateY: y.value},
      {scale: scale.value}
    ]
  }))

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={source}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
