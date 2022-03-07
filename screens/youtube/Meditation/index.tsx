import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Progress from './Progress';

const Meditation = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/bg.png')} style={styles.background} />
      <Progress />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  }
})

export default Meditation;
