import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ListRow from '../components/ListRow';

const TabOneScreen: React.FC<{}> = (props: any) => {
  return (
    <View style={styles.container}>
      <ListRow title={"Joe & the Juice Cards"} onPress={() => {
        props.navigation.navigate('JuiceCards');
      }} />
      <ListRow title={"Google Chrome iOS Tabs"} onPress={() => {
        props.navigation.navigate('Tab');
      }} />
      <ListRow title={"Revolut Chart"} onPress={() => {
        props.navigation.navigate('RevolutChart');
      }} />
      <ListRow title={"Soundcloud Audio Player"} onPress={() => {
        props.navigation.navigate('AudioPlayer');
      }} />
      <ListRow title={"Headspace Meditation"} onPress={() => {
        props.navigation.navigate('Meditation');
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabOneScreen;
