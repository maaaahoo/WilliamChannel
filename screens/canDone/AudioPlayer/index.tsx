import React, {useRef} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import Waveform from './Waveform';

import waveform from './data/waveform.json';

const AudioPlayer = () => {
  const x = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Image source={require('./data/cover.jpg')} style={styles.cover} />
      <View style={styles.progress}>
        <View>
          <Animated.ScrollView 
            bounces={false} 
            horizontal
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([{
              nativeEvent: {
                contentOffset: { x }
              }
            }])}
          >
            <Waveform color={"white"} {...{waveform}} />
            <View style={StyleSheet.absoluteFill}>
              <Waveform color={"#e95f2a"} progress={x} {...{waveform}} />
            </View>
          </Animated.ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  progress: {
    flex: 0.5,
    justifyContent: 'center',
  }
})

export default AudioPlayer;
