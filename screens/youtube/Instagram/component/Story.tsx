import React from 'react';
import {StyleSheet, Image} from 'react-native';

const Story: React.FC<{}> = props => {
  const {story: {source}} = props;
  return (
    <Image style={styles.image} {...{source}} />
  )
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined
  }
})

export default Story;