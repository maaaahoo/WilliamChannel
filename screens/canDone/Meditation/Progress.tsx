import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

interface ProgressProps {

}

const width = 125;
const height = 125;
const radius = width / 2;
const padding = 30;

const Progress = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(Animated.timing(rotation, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: false,
      })),
      Animated.loop(Animated.timing(animation, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: false,
      })),
    ]).start();
  }, []);

  const negRotateZ = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const translation = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 8, 0],
  });
  const negTranslation = Animated.multiply(translation, -1);

  return (
    <Animated.View style={[styles.container]}>
      <Animated.View style={[styles.outerCircle, { transform: [{ translateY: translation }] }]} />
      <Animated.View style={[styles.outerCircle, { transform: [{ translateY: negTranslation }] }]} />
      <Animated.View style={[styles.outerCircle, { transform: [{ translateX: translation }] }]} />
      <Animated.View style={[styles.outerCircle, { transform: [{ translateY: negTranslation }] }]} />
      <Animated.View style={[styles.circle, { transform: [{ translateY: translation }] }]} />
      <Animated.View style={[styles.circle, { transform: [{ translateY: negTranslation }] }]} />
      <Animated.View style={[styles.circle, { transform: [{ translateX: translation }] }]} />
      <Animated.View style={[styles.circle, { transform: [{ translateY: negTranslation }] }]} />
      <Animated.View style={[styles.buttonContainer, { transform: [{ rotateZ: negRotateZ }] }]}>
        <Icon name="ios-pause" color="#fbe3b9" size={54} />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width + padding * 2,
    height: height + padding * 2,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    backgroundColor: '#829ead',
    width: width + padding,
    height: height + padding,
    borderRadius: (width + padding) / 2,
    position: 'absolute',
    top: padding / 2,
    left: padding / 2,
  },
  circle: {
    backgroundColor: '#71758e',
    width,
    height,
    borderRadius: radius,
    position: 'absolute',
    top: padding,
    left: padding,
  },
})

export default Progress;
