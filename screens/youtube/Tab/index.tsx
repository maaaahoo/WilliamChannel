import React, {useRef} from 'react';
import { StyleSheet, View, SafeAreaView, MaskedViewIOS, Animated} from 'react-native';

import TabBar, {TABBAR_HEIGHT, TABBAR_WIDTH, TAB_WIDTH} from "./TabBar";

const Tab: React.FC<{}> = () => {
  const x = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TabBar color="#f8f9fa" backgroundColor="#828384" borderColor="#505152" />
        <MaskedViewIOS
          style={StyleSheet.absoluteFill}
          maskElement={<Animated.View style={[styles.activeTab, { transform: [{
            translateX: x.interpolate({
              inputRange: [0, TABBAR_WIDTH],
              outputRange: [TABBAR_WIDTH - TAB_WIDTH, 0]
            })          
          }] } ]} />}
        >
          <TabBar color="#3b4043" backgroundColor="#f8f9fa" borderColor="#f8f9fa" />
        </MaskedViewIOS>
        <Animated.ScrollView 
          style={StyleSheet.absoluteFill}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: TABBAR_WIDTH * 2
          }}
          horizontal={true}
          onScroll={Animated.event([ {nativeEvent: {contentOffset: { x }}}], { useNativeDriver: true })}
          snapToInterval={TAB_WIDTH + TAB_WIDTH / 2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#212223",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "black",
    width: TAB_WIDTH,
    height: TABBAR_HEIGHT
  },
  container: {
    width: TABBAR_WIDTH,
    height: TABBAR_HEIGHT
  }
});

export default Tab;
