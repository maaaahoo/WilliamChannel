import React, {useRef, useEffect, useCallback} from "react";
import {View, StyleSheet, Dimensions, Animated, TextInput} from 'react-native';
import { Svg, Path, LinearGradient, Defs, Stop } from 'react-native-svg';

import * as shape from 'd3-shape';
import * as path from 'svg-path-properties';

import {
  scaleLinear,
  scaleTime,
  scaleQuantile,
} from 'd3-scale';

const d3 = {
  shape,
};

const height = 200;
const {width} = Dimensions.get('window');
const cursorRadius = 10;

const data = [
  { x: new Date(2018, 9, 1), y: 0 },
  { x: new Date(2018, 9, 16), y: 0 },
  { x: new Date(2018, 9, 17), y: 200 },
  { x: new Date(2018, 10, 1), y: 200 },
  { x: new Date(2018, 10, 2), y: 300 },
  { x: new Date(2018, 10, 5), y: 300 },
]

const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2018, 10, 5)]).range([0, width]);
const scaleY = scaleLinear().domain([0, 300]).range([height - 10, 10]);
const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);

const line = d3.shape.line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);

const properties = path.svgPathProperties(line);
const lineLength = properties.getTotalLength();

const RevolutChart: React.FC<{}> = () => {
  const x = useRef(new Animated.Value(0)).current;
  const cursorRef = useRef();
  const labelRef = useRef();

  const moveCursor = useCallback((value) => {
    const {x,y} = properties.getPointAtLength(lineLength - value);
    cursorRef.current && cursorRef.current.setNativeProps({
      top: y - cursorRadius,
      left: x - cursorRadius,
    });
    const label = scaleLabel(scaleY.invert(y));
    labelRef.current && labelRef.current.setNativeProps({ text: `${label} CHF` });
  }, [])

  useEffect(() => {
    x.addListener(({ value }) => moveCursor(value));
    moveCursor(0);
  }, []);

  const translateX = x.interpolate({
    inputRange: [0, lineLength],
    outputRange: [width - 100, 0],
    extrapolate: "clamp",
  })

  return (
    <View style={styles.container}>
      <Svg {...{width, height}}>
        <Defs>
          <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <Stop offset="0%" stopColor="#cee3f9" />
            <Stop offset="80%" stopColor="#ddedfa" />
            <Stop offset="100%" stopColor="#feffff" />
          </LinearGradient>
        </Defs>
        <Path d={line} fill={'transparent'} stroke={'#367be2'} strokeWidth={5} />
        <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)"/>
        <View ref={ref => cursorRef.current = ref} style={styles.cursor} />
      </Svg>
      <Animated.View style={[styles.label, {transform: [{ translateX }]}]}>
        <TextInput ref={ref => labelRef.current = ref} />
      </Animated.View>
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{
          width: lineLength * 2, 
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x
              }
            }
          }
        ], {
          useNativeDriver: true,
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    height,
    width,
    backgroundColor: '#FFFFFF',
  },
  cursor: {
    width: 2 * cursorRadius,
    height: 2 * cursorRadius,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: '#fff'
  },
  label: {
    backgroundColor: 'lightgray',
    width: 100,
    position: 'absolute',
    top: -45,
    left: 0,
  }
})

export default RevolutChart;
