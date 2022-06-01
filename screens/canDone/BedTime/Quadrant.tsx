import React from 'react';
import { polar2Canvas } from 'react-native-redash';
import { Circle, G, Line } from 'react-native-svg';
import { CENTER, R, STROKE, TAU, PADDING } from './Contants';

interface QuadrantProps {
};

const LINES = 75;
const DELTA = TAU / LINES;

const Quadrant: React.FC<QuadrantProps> = props => {
  const {} = props;

  return (
    <G mask='url(#mask)'>
      <Circle
        r={R + STROKE/2}
        cx={CENTER.x}
        cy={CENTER.y}
        fill={'yellow'}
      />
      {
        new Array(LINES).fill(0).map((_,index) => {
          const theta = index * DELTA;
          const p1 = polar2Canvas({
            theta, 
            radius: R + PADDING / 2
          }, CENTER);
          const p2 = polar2Canvas({
            theta, 
            radius: R - PADDING / 2
          }, CENTER);

          return <Line 
                  x1={p1.x} 
                  y1={p1.y} 
                  x2={p2.x} 
                  y2={p2.y}
                  stroke={'orange'}
                  strokeWidth={4}
                />
        })
      }
    </G>
  )
};

export default Quadrant;
