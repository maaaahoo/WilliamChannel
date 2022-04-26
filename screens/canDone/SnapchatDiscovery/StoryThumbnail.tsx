import React, {useRef, useImperativeHandle, forwardRef} from "react";
import {
  View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Platform,
} from "react-native";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;
const offset = (v: number) => (Platform.OS === "android" ? (v + 20) : v);

interface StoryThumbnailProps {
  story: any,
  onPress: () => void,
  selected: boolean,
};

const StoryThumbnail: React.ForwardRefRenderFunction<any, StoryThumbnailProps> = (props, ref) => {
  const {story, onPress, selected} = props;
  const imageRef = useRef();

  useImperativeHandle(ref, () => ({
    measure
  }));


  const measure = async () => new Promise(resolve => imageRef.current.measureInWindow((x, y, width, height) => resolve({
    x, y: offset(y), width, height,
  })));

  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View style={styles.container}>
        {
          !selected && (
          <Image source={story.source} style={styles.image} ref={imageRef} />
          )
        }
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius,
  },
});

export default forwardRef(StoryThumbnail);
