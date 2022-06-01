import React from 'react';
import {StyleSheet} from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { canvas2Polar, Vector } from 'react-native-redash';
import { CENTER, containedInSquare, normalize, STROKE } from './Contants';

enum Region {
  START,
  END,
  MAIN,
}


interface GestureProps {
  start: Animated.SharedValue<number>, 
  startPos: Animated.DerivedValue<Vector>, 
  end: Animated.SharedValue<number>, 
  endPos: Animated.DerivedValue<Vector>
};

const Gesture: React.FC<GestureProps> = props => {
  const {
    start, startPos, end, endPos
  } = props;

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {region: Region, offset: number}>({
    onStart: ({x, y}, ctx) => {
      const value = {x, y};
      if (containedInSquare(value, startPos.value, STROKE)) {
        ctx.region = Region.START;
        ctx.offset = start.value;
      } else if (containedInSquare(value, endPos.value, STROKE)) {
        ctx.region = Region.END;
        ctx.offset = end.value;
      } else {
        const {theta} = canvas2Polar(value, CENTER);
        ctx.region = Region.MAIN;
        ctx.offset = theta;
      }
    },
    onActive: ({x,y}, ctx) => {
      const value = {x,y};
      const {theta} = canvas2Polar(value, CENTER);
      const delta = theta - ctx.offset;
      ctx.offset = theta;
      if(ctx.region === Region.START) {
        start.value = normalize(start.value + delta);
      } else if (ctx.region === Region.END) {
        end.value = normalize(end.value + delta);
      } else {
        start.value = normalize(start.value + delta);
        end.value = normalize(end.value + delta);
      }
    }
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  )
};

export default Gesture;
