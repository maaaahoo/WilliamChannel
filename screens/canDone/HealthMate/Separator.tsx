import _ from 'lodash';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const dash = width / 50;

interface SeparatorProps {
};

const Separator: React.FC<SeparatorProps> = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      {
        _.times(50).map((v, i) => {
          return (
            <View key={i} style={styles.dash} />
          )
        })
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  dash: {
    backgroundColor: 'white',
    width: dash,
    height: 2,
    marginLeft: 2,
  }
});

export default Separator;
