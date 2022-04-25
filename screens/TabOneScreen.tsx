import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ListRow from '../components/ListRow';

const TabOneScreen: React.FC<{}> = (props: any) => {
  return (
    <ScrollView style={styles.container}>
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
      <ListRow title={"Freeletics Running"} onPress={() => {
        props.navigation.navigate('Freeletics');
      }} />
      <ListRow title={"Instagram Stories"} onPress={() => {
        props.navigation.navigate('Instagram');
      }} />
      <ListRow title={"Withings Health Mate"} onPress={() => {
        props.navigation.navigate('HealthMate');
      }} />
      <ListRow title={"Snapchat Discovery"} onPress={() => {
        props.navigation.navigate('SnapchatDiscovery');
      }} />
      <ListRow title={"Tinder Swiping"} onPress={() => {
        props.navigation.navigate('TinderSwiping');
      }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
});

export default TabOneScreen;
