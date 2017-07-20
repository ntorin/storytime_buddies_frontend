import {Navigation} from 'react-native-navigation';

import Types from './Types';
import Actions from './Actions';
import Transitions from './Transitions';

import Push from './types/Push';
import Drawer from './types/Drawer';
import LightBox from './types/LightBox';
import Notification from './types/Notification';
import Modal from './types/Modal';
import TopTabs from './types/TopTabs';
import TabOne from './types/tabs/TabOne';
import TabTwo from './types/tabs/TabTwo';

import CollapsingHeader from './transitions/CollapsingHeader';
import SharedElementTransitions from './transitions/SharedElementTransitions';

import Cards from './transitions/sharedElementTransitions/Cards/Cards';
import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';

import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';

export default function () {
  Navigation.registerComponent('react_native_skeleton.Types', () => Types);
  Navigation.registerComponent('react_native_skeleton.Actions', () => Actions);
  Navigation.registerComponent('react_native_skeleton.Transitions', () => Transitions);

  Navigation.registerComponent('react_native_skeleton.Types.Push', () => Push);
  Navigation.registerComponent('react_native_skeleton.Types.Drawer', () => Drawer);
  Navigation.registerComponent('react_native_skeleton.Types.Screen', () => Drawer);
  Navigation.registerComponent('react_native_skeleton.Types.Modal', () => Modal);
  Navigation.registerComponent('react_native_skeleton.Types.LightBox', () => LightBox);
  Navigation.registerComponent('react_native_skeleton.Types.Notification', () => Notification);
  Navigation.registerComponent('react_native_skeleton.Types.TopTabs', () => TopTabs);
  Navigation.registerComponent('react_native_skeleton.Types.TopTabs.TabOne', () => TabOne);
  Navigation.registerComponent('react_native_skeleton.Types.TopTabs.TabTwo', () => TabTwo);

  Navigation.registerComponent('react_native_skeleton.Transitions.CollapsingHeader', () => CollapsingHeader);
  Navigation.registerComponent('react_native_skeleton.Transitions.SharedElementTransitions', () => SharedElementTransitions);
  Navigation.registerComponent('react_native_skeleton.Transitions.SharedElementTransitions.Cards', () => Cards);
  Navigation.registerComponent('react_native_skeleton.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
  Navigation.registerComponent('react_native_skeleton.Transitions.SharedElementTransitions.Masonry', () => Masonry);
  Navigation.registerComponent('react_native_skeleton.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);
}
