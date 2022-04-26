import React from 'react';
import {View,Dimensions} from 'react-native';
import {Circle, Svg} from 'react-native-svg';
import Animated, { interpolate, multiply } from 'react-native-reanimated';

interface CircularProgressProps {
  progress: any
};
const AnimatedCircular = Animated.createAnimatedComponent(Circle);
const {width} = Dimensions.get('window');
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

const CircularProgress: React.FC<CircularProgressProps> = props => {
  const {progress} = props;
  const a = interpolate(progress, [0,1], [0, Math.PI * 2]);
  const strokeDashoffset = multiply(a, radius);

  console.log(a)

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={"#2162cc"}
        fill="none"
        cx={size/2}
        cy={size/2}
        r={radius}
        {...{strokeWidth}}
      />
      <AnimatedCircular
        stroke={"#2162cc"}
        fill="none"
        cx={size/2}
        cy={size/2}
        r={radius}

        strokeDasharray={`${circumference} ${circumference}`}
        {...{strokeWidth, strokeDashoffset}}
      />
    </Svg>
  )
};

export default CircularProgress;
