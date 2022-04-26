import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import * as Location from 'expo-location';
import Run from './Run';

const FreeleticsRunning = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
      setLatitude(latitude);
      setLongitude(longitude);
    })();
  }, []);

  return (
    <Run distance={200} {...{latitude, longitude}} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29252b'
  },
})

export default FreeleticsRunning;
