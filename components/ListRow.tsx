import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

interface ListRowProps {
  title: string;
  onPress: () => void;
}

const ListRow: React.FC<ListRowProps> = (props) => {
  const {title, onPress} = props;
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={{
          flex: 1,
          fontSize: 16,
          fontWeight: 'bold',

        }}>{title}</Text>
        <AntDesign name="right" />
      </TouchableOpacity>
      <View style={{
        width: Dimensions.get("window").width,
        height: 1,
        backgroundColor: '#e9e9e9'
      }} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  }
})

export default ListRow;
