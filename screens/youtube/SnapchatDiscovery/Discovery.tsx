import React, {useState} from 'react';
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

  const selectStory = async (story, index: number) => {
    const imagePosition = await thumbnail[index].current?.measure();
    setPosition(imagePosition);
    setSelect(story);
  }

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
                selected={false}
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
          <StoryModal story={select} position={position} />
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
