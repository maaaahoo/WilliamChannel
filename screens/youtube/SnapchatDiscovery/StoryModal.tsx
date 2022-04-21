import React, { useRef } from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

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
};

const StoryModal: React.FC<StoryModalProps> = props => {
  const {story, position} = props;
  const {x, y, width: w, height: h} = position;
  const translateX = useRef(new Animated.Value(x)).current;
  const translateY = useRef(new Animated.Value(y)).current;
  const width = useRef(new Animated.Value(w)).current;
  const height = useRef(new Animated.Value(h)).current;
  const velocityY = useRef(new Animated.Value(0)).current;
  const state = useRef(State.UNDETERMINED).current;

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

  return (
    <View style={styles.container}>
      <Animated.Code>
        {() => block([
          cond(eq(state, State.UNDETERMINED), runSpring(translateX, 0)),
          cond(eq(state, State.UNDETERMINED), runSpring(translateY, 0)),
          cond(eq(state, State.UNDETERMINED), runSpring(width, wWidth)),
          cond(eq(state, State.UNDETERMINED), runSpring(height, wHeight)),
        ])}
      </Animated.Code>
      <PanGestureHandler
        activeOffsetY={100}
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}      
      >
        <Animated.View {...{style}}>
          <Image source={story.source} style={styles.image} />
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
  }
})

export default StoryModal;
