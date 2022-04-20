import _, { invert } from 'lodash';
import React, {useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet, Animated, Dimensions, TextInput, InteractionManager} from 'react-native';
import Graph, {ROW_HEIGHT} from './Graph';

import {
  scaleLinear,
} from 'd3-scale';

const {height: h} = Dimensions.get('window');
const PADDING = 50;

interface WeightTargetProps {
  height: number;
  weight: number;
};

const WeightTarget: React.FC<WeightTargetProps> = props => {
  const {weight, height} = props;

  const y = useRef(new Animated.Value(0)).current;
  const relativeInput = useRef();
  const absoluteInput = useRef();
  const scroll = useRef();

  const BMI = _.round(weight / (height * height));
  const from = BMI - 10;
  const to = BMI + 10;

  const BMIScale = scaleLinear().domain([0, (to - from + 1)* ROW_HEIGHT - h]).range([to, from]);

  useEffect(() => {
    const listener = y.addListener(update);

    InteractionManager.runAfterInteractions(() => {
      const y = BMIScale.invert(BMI);
      scroll.current?.scrollTo({
        y,
        animated: false
      });
      update({value: y});
    });

    return () => {
      y.removeListener(listener)
    }
  }, []);

  const update = useCallback(({ value }) => {
    // console.log(BMIScale(value));
    const currentBMI = BMIScale(value);
    const current_kg = (_.round(currentBMI * height * height * 2) / 2).toFixed(1);
    const relative = (current_kg - weight).toFixed(1);
    relativeInput.current?.setNativeProps({
      text: `${relative}`
    });
    absoluteInput.current?.setNativeProps({
      text: `${current_kg}`
    });
  }, [])

  const inputRange = [0, (to - from + 1)* ROW_HEIGHT - h];
  const translateY = y.interpolate({
    inputRange,
    outputRange: [-h/2 + PADDING, h/2 - PADDING]
  })
  const translateY2 = y.interpolate({
    inputRange,
    outputRange: [h/2 - PADDING, -h/2 + PADDING]
  })
  const scale = y.interpolate({
    inputRange: [inputRange[0], inputRange[1]/2, inputRange[1]],
    outputRange: [1, 0.5, 1]
  })
  const scaleY = y.interpolate({
    inputRange: [inputRange[0], inputRange[1]/2, inputRange[1]],
    outputRange: [h - PADDING * 2, 25, h - PADDING * 2]
  })
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scroll}
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        bounces={false}
      >
        <Graph {...{from, to}} />
      </Animated.ScrollView>
      <View style={styles.overlay} pointerEvents="none">
        <Animated.View style={[styles.line, {
          transform: [{
            scaleY
          }]
        }]} />
      </View>
      <View style={styles.overlay} pointerEvents="none">
        <Animated.View style={[styles.relativeCircle, {
          transform: [{
            scale
          }]
        }]}>
          <TextInput ref={relativeInput} style={styles.relativeValue} />
        </Animated.View>
      </View>
      <View style={styles.overlay} pointerEvents="none">
        <Animated.View style={[styles.oppositeCircle, {
          transform: [{
            translateY: translateY2
          }]
        }]} />
      </View>
      <View style={styles.overlay} pointerEvents="none">
        <Animated.View style={[styles.absoluteCircle, {
          transform: [{
            translateY
          }]
        }]}>
          <TextInput ref={absoluteInput} style={styles.absoluteValue} />
        </Animated.View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relativeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#69d0fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oppositeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white'
  },
  line: {
    backgroundColor: 'white',
    height: 1,
    width: 1
  },
  relativeValue: {
    color: 'white',
    fontSize: 24,
  },
  absoluteValue: {
    color: '#69d0fb',
    fontSize: 24,
  }
})

export default WeightTarget;
