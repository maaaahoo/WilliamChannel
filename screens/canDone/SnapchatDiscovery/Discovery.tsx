import React, {useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import StoryThumbnail from './StoryThumbnail';
import StoryModal from './StoryModal';

interface DiscoveryProps {
};

const Discovery: React.FC<DiscoveryProps> = props => {
  const {stories} = props;

  const [select, setSelect] = useState();
  const [thumbnail] = useState(() => {
    return stories.map(() => React.createRef());
  });
  const [position, setPosition] = useState();

  const selectStory = useCallback(async (story, index: number) => {
    const imagePosition = await thumbnail[index].current?.measure();
    setPosition(imagePosition);
    setSelect(story);
  }, []);

  const onRequestClose = useCallback(() => {
    console.log('onRequestClose');
    setPosition(null);
    setSelect(null);
  }, []);

  return (
    <View style={styles.flex}>
      <ScrollView style={styles.flex} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={styles.container}>
          {
          stories.map(
            (s, i) => (
              <StoryThumbnail
                ref={thumbnail[i]}
                key={s.id}
                selected={!!select && select?.id === s.id}
                onPress={() => {
                  selectStory(s, i);
                }}
                story={s}
              />
            ),
          )
        }
        </SafeAreaView>
      </ScrollView>
      {
        select && (
          <StoryModal story={select} position={position} onRequestClose={onRequestClose} />
        )
      }
    </View>
  )
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

export default Discovery;
