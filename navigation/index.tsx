/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

import JuiceCards from '../screens/canDone/JuiceCards';
import Tab from '../screens/canDone/Tab';
import RevolutChart from '../screens/canDone/RevolutChart';
import AudioPlayer from '../screens/canDone/AudioPlayer';
import Meditation from '../screens/canDone/Meditation';
import Freeletics from '../screens/canDone/Freeletics';
import Instagram from '../screens/canDone/Instagram';
import HealthMate from '../screens/canDone/HealthMate';
import SnapchatDiscovery from '../screens/canDone/SnapchatDiscovery';
import TinderSwiping from '../screens/canDone/TinderSwiping';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tarot from '../screens/canDone/Tarot';
import PhilzCoffee from '../screens/canDone/PhilzCoffee';
import LayoutAnimations from '../screens/canDone/LayoutAnimations';

import Worklet from '../screens/5minus/Worklet';
import CircularProgress from "../screens/5minus/CircularProgress"
import AccordionList from '../screens/5minus/AccordionList';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TabComponent />
    </NavigationContainer>
  );
}

const TabNavi = createBottomTabNavigator();

const TabComponent: React.FC<{}> = () => {
  return (
    <TabNavi.Navigator>
      <TabNavi.Screen options={{
        header: () => null
      }} name="Done" component={Stack1Navigator} />
      <TabNavi.Screen options={{
        header: () => null
      }} name="5Minus" component={Stack2Navigator} />
    </TabNavi.Navigator>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack1 = createNativeStackNavigator();

function Stack1Navigator() {
  return (
    <Stack1.Navigator
      initialRouteName={"YouTube"}
    >
      <Stack1.Screen name="YouTube" component={TabOneScreen} options={() => ({
        title: 'Can it be Done in RN',
      })} />
      <Stack1.Screen name="JuiceCards" component={JuiceCards} />
      <Stack1.Screen name="Tab" component={Tab} />
      <Stack1.Screen name="RevolutChart" component={RevolutChart} />
      <Stack1.Screen name="AudioPlayer" component={AudioPlayer} />
      <Stack1.Screen name="Meditation" component={Meditation} />
      <Stack1.Screen name="Freeletics" component={Freeletics} />
      <Stack1.Screen name="Instagram" component={Instagram} />
      <Stack1.Screen name="HealthMate" component={HealthMate} />
      <Stack1.Screen name="SnapchatDiscovery" options={() => ({
        header: () => null
      })} component={SnapchatDiscovery} />
      <Stack1.Screen name="TinderSwiping" component={TinderSwiping} />
      <Stack1.Screen name="Tarot" component={Tarot} />
      <Stack1.Screen name="PhilzCoffee" component={PhilzCoffee} />
      <Stack1.Screen name="LayoutAnimations" component={LayoutAnimations} />
      <Stack1.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack1.Group screenOptions={{ presentation: 'modal' }}>
        <Stack1.Screen name="Modal" component={ModalScreen} />
      </Stack1.Group>
    </Stack1.Navigator>
  );
}


const Stack2 = createNativeStackNavigator();

function Stack2Navigator() {
  return (
    <Stack2.Navigator
      initialRouteName={"YouTube"}
    >
      <Stack2.Screen name="YouTube" component={TabTwoScreen} options={() => ({
        title: '5 Minus Reanimated',
      })} />
      <Stack2.Screen name="Worklet" component={Worklet} />
      <Stack2.Screen name="CircularProgress" component={CircularProgress} />
      <Stack2.Screen name="AccordionList" component={AccordionList} />
    </Stack2.Navigator>
  );
}