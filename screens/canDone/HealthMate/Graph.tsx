import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as _ from 'lodash';
import Separator from './Separator'

export const ROW_HEIGHT = 100;

interface GraphProps {
  from: number;
  to: number;
};

const separator = {
  18: 'Underweight',
  19: 'Health Weight',
  24: 'Health Weight',
  25: 'Overweight',
  29: 'Overweight',
  30: "Obese",
}

const Graph: React.FC<GraphProps> = props => {
  const {from, to} = props;
  const interations = to - from + 1;

  return (
    <View style={styles.container}>
      {
        _.times(interations).map((v, i) => {
          const BMI = from + i;
          return (
            <React.Fragment key={i}>
              {
                separator[BMI] && separator[BMI + 1] && (
                  <Separator />
                )
              }
              <View style={styles.row}>
                <Text style={styles.label}>{`BMI ${BMI}`}</Text>
                {
                  separator[BMI] && (
                    <Text style={[styles.separator, { 
                      alignSelf: separator[BMI + 1] ? 'flex-start' : 'flex-end'
                     }]}>{separator[BMI]}</Text>
                  )
                }
              </View>
            </React.Fragment>
          )
        }).reverse()
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69d0fb'
  },
  row: {
    height: ROW_HEIGHT,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  separator: {
    color: 'white',
    fontSize: 16,
  }
});

export default Graph;
