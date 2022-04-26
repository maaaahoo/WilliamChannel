import React, {useRef} from 'react';
import {View, Animated, Dimensions, StyleSheet} from 'react-native';
import Story from './Story';

const {width, height} = Dimensions.get('window');
const perspective = 400;
const A = Math.atan(perspective / width / 2);
 
const Stories: React.FC<{}> = props => {
  const {stories} = props;
  const x = useRef(new Animated.Value(0)).current;
  const scroll = useRef();

  const getStyle = (index: number) => {
    const offset = width * index;
    const inputRange = [offset - width, offset + width];
    const translateX = x.interpolate({
      inputRange,
      outputRange: [width/2, -width/2],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${A}rad`, `-${A}rad`],
      extrapolate: 'clamp',
    });
    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width/2, -width/2],
      extrapolate: 'clamp',
    });
    return {
      ...StyleSheet.absoluteFillObject,
      transform:[
        { perspective },
        { translateX },
        { rotateY },
        { translateX: translateX1 }
      ]
    }
  }

  return (
    <View style={styles.container}>
      {
        stories.map((story, index) => (
          <Animated.View style={getStyle(index)} key={story.id}>
            <Story {...{story}} />
          </Animated.View>
        ))
      }
      <Animated.ScrollView
        ref={scroll}
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        contentContainerStyle={{ width: width * stories.length }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        decelerationRate={0.99}
        horizontal
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
})

export default Stories;