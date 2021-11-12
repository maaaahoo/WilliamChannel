import React, {useRef} from "react";
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import Card, {CARD_HEIGHT, CARD_TITLE, CARD_PADDING} from './Card';
const cards = [
  {
    name: "Shot",
    color: "#a9d0b6",
    price: "30 CHF"
  },
  {
    name: "Juice",
    color: "#e9bbd1",
    price: "64 CHF"
  },
  {
    name: "Mighty Juice",
    color: "#eba65c",
    price: "80 CHF"
  },
  {
    name: "Sandwich",
    color: "#95c3e4",
    price: "85 CHF"
  },
  {
    name: "Combi",
    color: "#1c1c1c",
    price: "145 CHF"
  },
  {
    name: "Signature",
    color: "#a390bc",
    price: "92 CHF"
  },
  {
    name: "Coffee",
    color: "#fef2a0",
    price: "47 CHF"
  }
];

const JuiceCards: React.FC<{}> = () => {
  const y = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {cards.map((item, i) => {
          const inputRange = [-CARD_HEIGHT, 0];
          const outputRange = [
            CARD_HEIGHT * i,
            (CARD_HEIGHT - CARD_TITLE) * -i,
          ]
          if (i > 0) {
            inputRange.push(CARD_PADDING * i);
            outputRange.push((CARD_HEIGHT - CARD_PADDING) * -i);
          }
          const translateY = y.interpolate({
            inputRange,
            outputRange,
            extrapolateRight: 'clamp'
          })
          return (
            <Animated.View 
              key={item.name}
              style={{
                transform: [{
                  translateY
                }]
            }}>
              <Card {...item} />
            </Animated.View>
          )
        })}
      </View>
      <Animated.ScrollView 
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: { y }
          }
        }],{ useNativeDriver: true }
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  contentContainer: {
    height: Dimensions.get('window').height * 2,
  }
})

export default JuiceCards;
