import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import Circle from './Circle';

interface BreatheProps {
};

const Breathe: React.FC<BreatheProps> = props => {
  const {} = props;
  const progress = useSharedValue(0);
  const goesDown = useSharedValue(false);
  
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 3000, easing: Easing.bezier(0.5, 0, 0.5, 1)}, () => {
      goesDown.value = !goesDown.value;
    }), -1, true);
  }, [progress]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{
        rotate: `${mix(progress.value, -Math.PI, 0)}rad`
      }]
    }
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[
        StyleSheet.absoluteFill,
        style
      ]}>
      {new Array(6).fill(0).map((_, index) => {
        return <Circle 
          index={index} 
          key={index} 
          progress={progress}
          goesDown={goesDown}
        />
      })}

      </Animated.View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});

export default Breathe;
