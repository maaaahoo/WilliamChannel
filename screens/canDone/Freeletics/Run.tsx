import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

interface Position {
  timestamp: number;
  coords: {
    latitude: number,
    longitude: number,
    accuracy: number,
  }
}

interface RunProps {
  distance: number;
  latitude: number;
  longitude: number;
}

const Run: React.FC<RunProps> = props => {
  useEffect(() => {
    let linster = null;
    const run = async () => {
      linster = await Location.watchPositionAsync({accuracy: 5, timeInterval: 1000, distanceInterval: 1}, (location: Position)=>{
        console.log({ location });
      })
    }

    run();
    return () => {
      linster && linster.remove();
    }
  });

  return (
    <View style={styles.container}>
      <MapView provider="google" style={styles.map}>

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29252b'
  },
  map: {
    flex: 0.61
  }
})

export default Run;
