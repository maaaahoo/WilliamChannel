import React from 'react';
import {Dimensions, Animated} from 'react-native';
import {Svg, Rect, Defs, ClipPath} from 'react-native-svg';

const barWidth = 4;
const barMargin = 1;

interface WaveformProps {
  waveform: {
    width: number,
    height: number,
    samples: number[],
  },
  color: string,
  progress?: Animated.Value,
} 

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const Waveform: React.FC<WaveformProps> = (props) => {
  const {waveform, color, progress} = props;
  const width = waveform.width * (barWidth + barMargin);
  const height = waveform.height + barMargin + (waveform.height * 0.61)

  const {width: wWidth} = Dimensions.get('window');
  const offset = wWidth / 2;
  const x = progress ? progress.interpolate({
    inputRange: [0, width-wWidth-offset, width-wWidth],
    outputRange: [`${-width + offset}`, `${-wWidth}`, `0`],
  }) : 0;
  
  return (
    <Svg {...{width, height}}>
      <Defs>
        <ClipPath id={"progress"}>
          <AnimatedRect {...{width, height, x}} />
        </ClipPath>
      </Defs>
      {
        waveform.samples.map((sample, key) => {
          return (
            <React.Fragment {...{key}}>
              <Rect
                clipPath="url(#progress)"
                y={waveform.height - sample} 
                x={key * (barWidth + barMargin) + offset} 
                fill={color} 
                width={barWidth} 
                height={sample} 
              />
              <Rect
                clipPath="url(#progress)"
                y={waveform.height + barMargin} 
                x={key * (barWidth + barMargin) + offset} 
                fill={color} 
                opacity={0.5}
                width={barWidth} 
                height={sample} 
              />
            </React.Fragment>
          )
        })
      }
    </Svg>
  );
}

export default Waveform;
