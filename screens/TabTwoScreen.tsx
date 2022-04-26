import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ListRow from '../components/ListRow';

const TabOneScreen: React.FC<{}> = (props: any) => {
  return (
    <ScrollView style={styles.container}>
      <ListRow title={"Worklet"} onPress={() => {
        props.navigation.navigate('Worklet');
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
