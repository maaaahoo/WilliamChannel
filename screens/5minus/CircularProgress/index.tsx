import React, {useEffect} from 'react';
import {View} from 'react-native';
import CircularProgress from './CircleProgress';
import { withTiming, useSharedValue, Easing } from 'react-native-reanimated';

interface IndexProps {
};

const Index: React.FC<IndexProps> = props => {
  const {} = props;
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 4000,
      easing: Easing.linear,
    })
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <CircularProgress progress={progress.value} />
    </View>
  )
};

export default Index;
