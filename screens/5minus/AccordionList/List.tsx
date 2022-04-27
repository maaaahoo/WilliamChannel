import React, {useState} from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
  Value,
  debug,
} from "react-native-reanimated";
import { mix, useTiming } from "react-native-redash";

import Chevron from "./Chevron";
import Item, { ListItem, LIST_ITEM_HEIGHT } from "./ListItem";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    overflow: "hidden",
  },
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

const List = ({ list }: ListProps) => {
  const open = useSharedValue(false);
  const aref = useAnimatedRef<View>();
  const height = useSharedValue(0);
  const transition = useDerivedValue(() => {
    return open.value === true ? withSpring(1) : withTiming(0);
  });

  const headerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: transition.value === 0 ? 8 : 0,
    borderBottomRightRadius: transition.value === 0 ? 8 : 0,
  }));

  const style = useAnimatedStyle(() => ({
    height: 1 + transition.value * height.value,
    opacity: transition.value === 0 ? 0 : 1,
  }));

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if(height.value === 0) {
            runOnUI(() => {
              "worklet";
              height.value = measure(aref).height;
            })();
          }
          console.log(height.value);
          open.value = !open.value;
        }}
      >
        <Animated.View style={[styles.container, headerStyle]}>
          <Text style={styles.title}>Total Points</Text>
          <Chevron {...{transition}} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, style]}>
        <View 
          ref={aref}
          onLayout={({
            nativeEvent: {
              layout: { height: h },
            },
          }) => console.log({ h })}
        >
          {list.items.map((item, key) => (
            <Item
              key={key}
              isLast={key === list.items.length - 1}
              {...{ item }}
            />
          ))}
        </View>
      </Animated.View>
    </>
  );
};

export default List;
