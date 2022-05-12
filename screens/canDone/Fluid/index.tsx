import React from 'react';
import {Dimensions} from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Slide from './Slide';

const {width} = Dimensions.get('window');

const slides = [
  {
    color: "#3984FF",
    picture: require("./assets/1.png"),
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: "#39ffb4",
    picture: require("./assets/2.png"),
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: "#ffb439",
    picture: require("./assets/4.png"),
    aspectRatio: 391.25 / 520,
  },
];

interface FluidProps {
};

const Fluid: React.FC<FluidProps> = props => {
  const {} = props;
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    }
  });

  return (
    <Animated.ScrollView 
      scrollEventThrottle={16} 
      snapToInterval={width} 
      decelerationRate="fast" 
      horizontal
      onScroll={onScroll}
    >
      {slides.map((slide, index) => {
        const isFirst = index === 0;
        const isLast = index === slides.length - 1;
        const colors = [
          isFirst? slide.color : slides[index - 1].color,
          slide.color,
          isLast? slide.color : slides[index + 1].color,
        ]

        return (
          <Slide slide={slide} key={index} index={index} x={x} colors={colors} />
        )
      })}
    </Animated.ScrollView>
  )
};

export default Fluid;
