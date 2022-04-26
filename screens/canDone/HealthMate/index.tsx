import React from 'react';
import {View} from 'react-native';
import WeightTarget from './WeightTarget';

interface HealthMateProps {
};

const HealthMate: React.FC<HealthMateProps> = props => {
  const {} = props;

  return (
    <WeightTarget weight={88} height={1.77} />
  )
};

export default HealthMate;
