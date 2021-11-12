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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabOneScreen;
