import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { runOnJS, runOnUI } from 'react-native-reanimated';

import Button from '../components/Button';

interface WorkletProps {
};

const formatDatetime = (datetime: Date) => {
  "worklet";
  return `${datetime.getFullYear()}-${
    datetime.getMonth() + 1
  }-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
};

const sayHelloFromJS = () => {
  Alert.alert("sayHelloFromJS")
}

const sayHello = (from: string) => {
  "worklet";
  console.log(`Hello at ${from}: ${formatDatetime(new Date())}`);
  runOnJS(sayHelloFromJS)();
}


const Worklet: React.FC<WorkletProps> = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      <Button label="Hello" primary onPress={() => runOnUI(sayHello)("Befual")}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default Worklet;
