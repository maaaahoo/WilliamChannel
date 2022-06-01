import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Vector } from 'react-native-redash';
import { Circle } from 'react-native-svg';
import { STROKE } from './Contants';

const AnimatedCircular = Animated.createAnimatedComponent(Circle);

interface CursorProps {
  pos: Animated.DerivedValue<Vector>;
};

const Cursor: React.FC<CursorProps> = props => {
  const {pos} = props;

  const animatedProps = useAnimatedProps(() => {
    return {
      cx: pos.value.x,
      cy: pos.value.y
    }
  })

  return (
    <AnimatedCircular 
      r={STROKE/2} 
      animatedProps={animatedProps}
      fill={"red"}
    />
  )
};

export default Cursor;
