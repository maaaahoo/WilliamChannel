import React, { useRef } from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {Video} from 'expo-av';

const {
  Value,
  Clock,
  cond,
  eq,
  set,
  block,
  clockRunning,
  startClock,
  spring,
  stopClock,
  event,
  and,
  lessOrEq,
  greaterThan,
  call,
  debug
} = Animated;

const { width: wWidth, height: wHeight } = Dimensions.get("window");

function runSpring(value, dest) {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    set(value, state.position),
  ]);
}

interface StoryModalProps {
  story: any,
  position: any,
  onRequestClose: () => void,
};

const StoryModal: React.FC<StoryModalProps> = props => {
  const {story, position, onRequestClose} = props;
  const {x, y, width: w, height: h} = position || { x: 0, y: 0 };
  const translateX = useRef(new Animated.Value(x)).current;
  const translateY = useRef(new Animated.Value(y)).current;
  const width = useRef(new Animated.Value(w)).current;
  const height = useRef(new Animated.Value(h)).current;
  const velocityY = useRef(new Animated.Value(0)).current;
  const state = useRef(new Animated.Value(State.UNDETERMINED)).current;

  const onGestureEvent = event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
          velocityY: velocityY,
          state: state,
        },
      },
    ],
    { useNativeDriver: true },
  );


  const style = {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    transform: [{
      translateX
    }, {
      translateY
    }]
  }

  return (
    <View style={styles.container}>
      <Animated.Code>
        {() => block([
          // 一进来的时候，默认放大到屏幕大小，动画方式spring
          cond(eq(state, State.UNDETERMINED), runSpring(translateX, 0)),
          cond(eq(state, State.UNDETERMINED), runSpring(translateY, 0)),
          cond(eq(state, State.UNDETERMINED), runSpring(width, wWidth)),
          cond(eq(state, State.UNDETERMINED), runSpring(height, wHeight)),
          // 当松手的时候，没有大幅度移动y，则保持屏幕大小
          cond(and(eq(state, State.END), lessOrEq(velocityY, 0)), [
            runSpring(translateX, 0),
            runSpring(translateY, 0),
            runSpring(width, wWidth),
            runSpring(height, wHeight),
          ]),
          // 当松手的时候，大幅度移动y，缩小到原图尺寸
          cond(and(eq(state, State.END), greaterThan(velocityY, 0)), [
            runSpring(translateX, x),
            runSpring(translateY, y),
            runSpring(width, w),
            runSpring(height, h),
            cond(eq(height, h), call([], onRequestClose)),
          ]),
          // 移动的时候缩放宽高、表示该视图正在缩小
          // cond(eq(this.state, State.ACTIVE), set(this.width, interpolate(this.translateY, {
          //   inputRange: [wHeight / 4, wHeight - position.height],
          //   outputRange: [wWidth, position.width],
          // }))),
          // cond(eq(this.state, State.ACTIVE), set(this.height, interpolate(this.translateY, {
          //   inputRange: [wHeight / 4, wHeight - position.height],
          //   outputRange: [wHeight, position.height],
          // }))),
        ])}
      </Animated.Code>
      <PanGestureHandler
        activeOffsetY={100}
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}      
      >
        <Animated.View {...{style}}>
          {
            !story.video && (
              <Image source={story.source} style={styles.image} />
            )
          }
          {
            story.video && (
              <Video
                source={story.video}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.video}
              />
            )
          }
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
  },
})

export default StoryModal;
