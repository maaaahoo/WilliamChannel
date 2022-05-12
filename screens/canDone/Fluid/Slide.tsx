import React from 'react';
import {View,StyleSheet, Dimensions, Image} from 'react-native';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedProps } from 'react-native-reanimated';
import { addCurve, cartesian2Canvas, createPath, serialize, Vector } from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';

const {width} = Dimensions.get('window');
const SIZE = width;

const vec = (x: number, y: number) => cartesian2Canvas({x, y}, {x:1, y:1});
const C = 0.551915024494;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const P00 = vec(0, 1);

const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

//const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

// const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C);
const P23 = vec(-1, 0);

// const P30 = vec(-1, 0);
const P31 = vec(-1, C);
const P32 = vec(-C, 1);
const P33 = vec(0, 1);
 
interface SlideProps {
  slide: {
    picture: number;
    aspectRatio: number;
    color: string;
  },
  index: number;
  x: Animated.SharedValue<number>;
  colors: [string, string, string];
};

const Slide: React.FC<SlideProps> = props => {
  const {slide, index, x, colors} = props;

  const animatedProps = useAnimatedProps(() => {
    const progress = (x.value - index * width) / width;
    const offset = interpolate(progress, [0, 1], [0, -2], Extrapolate.CLAMP);
    const addX = (v: Vector) => {
      return { x: v.x + offset, y: v.y}
    }

    const path = createPath({ x: P00.x + offset, y: P00.y });
    addCurve(path, {
      c1: addX(P01),
      c2: P02,
      to: P03,
    });
    addCurve(path, {
      c1: P11,
      c2: addX(P12),
      to: addX(P13),
    });
    addCurve(path, {
      c1: addX(P21),
      c2: {
        x: interpolate(progress, [-0.3, 0], [1, 0], Extrapolate.CLAMP),
        y: P22.y
      },
      to: {
        x: interpolate(progress, [-0.3, 0], [1, 0], Extrapolate.CLAMP),
        y: P23.y
      },
    });
    addCurve(path, {
      c1: {
        x: interpolate(progress, [-0.3, 0], [1, 0], Extrapolate.CLAMP),
        y: P31.y
      },
      c2: addX(P32),
      to: addX(P33),
    });
    return {
      d: serialize(path),
      fill: interpolateColor(progress, [-1, 0, 1], colors)
    };
  })

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox={"0 0 2 2"}>
        <AnimatedPath animatedProps={animatedProps} fill={slide.color} />
      </Svg>
      <View style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={slide.picture} style={{
          width: width * 0.5,
          height: width * 0.5 * slide.aspectRatio
        }} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Slide;
