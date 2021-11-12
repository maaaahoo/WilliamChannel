import React from "react";
import {StyleSheet, View} from 'react-native';

interface CardProps {
  name: string;
  color: string;
  price: string;
}

export const CARD_HEIGHT = 250;
export const CARD_TITLE = 45;
export const CARD_PADDING = 5;

const Card: React.FC<CardProps> = (props) => {
  const {name, color, price} = props;
  return (
    <View style={[styles.card, {backgroundColor: color}]} />
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    borderRadius: 10,
  }
})

export default Card;
 