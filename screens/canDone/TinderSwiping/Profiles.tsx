import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from "@expo/vector-icons";
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Card from "./Card";
import Animated, { add, concat, Extrapolate, cond, eq, set, Value, clockRunning, startClock, spring, stopClock, Clock, lessThan, and, greaterThan } from 'react-native-reanimated';

const {width} = Dimensions.get('window');
interface ProfilesProps {
};

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

const Profiles: React.FC<ProfilesProps> = props => {
  const {profiles} = props;
  const [curProfile, setProfiles] = useState(profiles);
  const translationX = useRef(new Animated.Value(0)).current;
  const translationY = useRef(new Animated.Value(0)).current;
  const velocityX = useRef(new Animated.Value(0)).current;
  const gestureState = useRef(new Animated.Value(State.UNDETERMINED)).current;
  
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const clockX = new Clock();
  const clockY = new Clock();

  const snapPoint = cond(
    and(lessThan(translationX, 0), lessThan(velocityX, -10)),
    -width, 
    cond(
      and(greaterThan(translationX, 0), greaterThan(velocityX, 10)),
      width,
      0
    )
  );

  const rotateZ = concat(translationX.interpolate({
    inputRange: [-width/2, width/2],
    outputRange: [15, -15],
    extrapolate: Extrapolate.CLAMP
  }), 'deg');
  const likeOpacity = translationX.interpolate({
    inputRange: [0, width/4],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  const nopeOpacity = translationX.interpolate({
    inputRange: [-width/4, 0],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translationX,
          translationY: translationY,
          velocityX: velocityX,
          state: gestureState,
        },
      },
    ],
    { useNativeDriver: true },
  )

  const style = {
    ...StyleSheet.absoluteFillObject,
    transform: [
      {
        translateX: translationX
      },
      {
        translateY: translationY
      },
      { rotateZ }
    ]
  };

  const init = () => {
    const newTransX = cond(eq(gestureState, State.END), [
      set(translationX, runSpring(clockX, translationX, snapPoint)),
    ], translationX);

    translateX.setValue(newTransX);

    const newTransY = cond(eq(gestureState, State.END), [
      set(translationY, runSpring(clockY, translationX, 0)),
    ], translationX);

    translateY.setValue(newTransY);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={32} color="gray" />
        <Icon name="message-circle" size={32} color="gray" />
      </View>
      <View style={styles.cards}>
        {
            curProfile.reverse().map(profile => (
              <Card key={profile.id} {...{ profile }} />
            ))
        }
        <PanGestureHandler
          {...{onGestureEvent}}
          onHandlerStateChange={onGestureEvent}
        >
         <Animated.View style={style}>
          <Card profile={curProfile[0]} {...{ likeOpacity, nopeOpacity }} />
         </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.footer}>
        <View style={styles.circle}>
          <Icon name="x" size={32} color="#ec5288" />
        </View>
        <View style={styles.circle}>
          <Icon name="heart" size={32} color="#6ee3b4" />
        </View>
      </View>
    </SafeAreaView>

  )
};

export {
  Profiles
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    flex: 1,
    margin: 8,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});
