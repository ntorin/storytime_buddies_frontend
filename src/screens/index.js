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

import Login from './pages/login/Login';
import LobbyList from './pages/home/tabs/lobbyList/LobbyList';
import Library from './pages/home/tabs/library/Library';
import MyProfile from './pages/home/tabs/myProfile/MyProfile';

export default function () {
  Navigation.registerComponent('storytime_buddies_frontend.Login', () => Login);
  Navigation.registerComponent('storytime_buddies_frontend.LobbyList', () => LobbyList);
  Navigation.registerComponent('storytime_buddies_frontend.Library', () => Library);
  Navigation.registerComponent('storytime_buddies_frontend.MyProfile', () => MyProfile);

  Navigation.registerComponent('storytime_buddies_frontend.Types', () => Types);
  Navigation.registerComponent('storytime_buddies_frontend.Actions', () => Actions);
  Navigation.registerComponent('storytime_buddies_frontend.Transitions', () => Transitions);

  Navigation.registerComponent('storytime_buddies_frontend.Types.Push', () => Push);
  Navigation.registerComponent('storytime_buddies_frontend.Types.Drawer', () => Drawer);
  Navigation.registerComponent('storytime_buddies_frontend.Types.Screen', () => Drawer);
  Navigation.registerComponent('storytime_buddies_frontend.Types.Modal', () => Modal);
  Navigation.registerComponent('storytime_buddies_frontend.Types.LightBox', () => LightBox);
  Navigation.registerComponent('storytime_buddies_frontend.Types.Notification', () => Notification);
  Navigation.registerComponent('storytime_buddies_frontend.Types.TopTabs', () => TopTabs);
  Navigation.registerComponent('storytime_buddies_frontend.Types.TopTabs.TabOne', () => TabOne);
  Navigation.registerComponent('storytime_buddies_frontend.Types.TopTabs.TabTwo', () => TabTwo);

  Navigation.registerComponent('storytime_buddies_frontend.Transitions.CollapsingHeader', () => CollapsingHeader);
  Navigation.registerComponent('storytime_buddies_frontend.Transitions.SharedElementTransitions', () => SharedElementTransitions);
  Navigation.registerComponent('storytime_buddies_frontend.Transitions.SharedElementTransitions.Cards', () => Cards);
  Navigation.registerComponent('storytime_buddies_frontend.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
  Navigation.registerComponent('storytime_buddies_frontend.Transitions.SharedElementTransitions.Masonry', () => Masonry);
  Navigation.registerComponent('storytime_buddies_frontend.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);
  
}
