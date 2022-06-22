import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ListRow from '../components/ListRow';

const TabOneScreen: React.FC<{}> = (props: any) => {
  return (
    <ScrollView style={styles.container}>
      <ListRow title={"Worklet"} onPress={() => {
        props.navigation.navigate('Worklet');
      }} />
      <ListRow title={"CircularProgress"} onPress={() => {
        props.navigation.navigate('CircularProgress');
      }} />
      <ListRow title={"Accordion List"} onPress={() => {
        props.navigation.navigate('AccordionList');
      }} />
      <ListRow title={"Breathe"} onPress={() => {
        props.navigation.navigate('Breathe');
      }} />
      <ListRow title={"ChanelScroll"} onPress={() => {
        props.navigation.navigate('ChanelScroll');
      }} />
      <ListRow title={"Pinch"} onPress={() => {
        props.navigation.navigate('Pinch');
      }} />
      <ListRow title={"LayoutAnimations"} onPress={() => {
        props.navigation.navigate('LayoutAnimations');
      }}/>
      <ListRow title={"StickyShapes"} onPress={() => {
        props.navigation.navigate('StickyShapes');
      }}/>
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
