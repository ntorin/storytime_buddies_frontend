import { Navigation } from 'react-native-navigation';


import Nav from './pages/nav/Nav';
import Login from './pages/login/Login';
import LobbyList from './pages/home/tabs/lobbyList/LobbyList';
import Library from './pages/home/tabs/library/Library';
import MyProfile from './pages/home/tabs/myProfile/MyProfile';
import Messages from './pages/home/tabs/messages/Messages';
import Lobby from './pages/lobby/Lobby';
import LobbyActions from './pages/lobby/LobbyActions'
import CreateLobby from './pages/lobby/CreateLobby';
import Chat from './pages/chat/Chat';
import UserDirectory from './pages/nav/items/UserDirectory';
import Settings from './pages/nav/items/Settings';
import Help from './pages/nav/items/Help';
import About from './pages/nav/items/About';
import MyFriends from './pages/home/tabs/myProfile/MyFriends';
import MyComments from './pages/home/tabs/myProfile/MyComments';
import MyStories from './pages/home/tabs/myProfile/MyStories';
import Story from './pages/story/Story';


export default function () {
  Navigation.registerComponent('storytime_buddies_frontend.Nav', () => Nav);
  Navigation.registerComponent('storytime_buddies_frontend.Login', () => Login);
  Navigation.registerComponent('storytime_buddies_frontend.LobbyList', () => LobbyList);
  Navigation.registerComponent('storytime_buddies_frontend.Library', () => Library);
  Navigation.registerComponent('storytime_buddies_frontend.MyProfile', () => MyProfile);
  Navigation.registerComponent('storytime_buddies_frontend.Messages', () => Messages);

  Navigation.registerComponent('storytime_buddies_frontend.Lobby', () => Lobby);
  Navigation.registerComponent('storytime_buddies_frontend.CreateLobby', () => CreateLobby);
  Navigation.registerComponent('storytime_buddies_frontend.LobbyActions', () => LobbyActions);

  Navigation.registerComponent('storytime_buddies_frontend.Chat', () => Chat);

  Navigation.registerComponent('storytime_buddies_frontend.Story', () => Story);

  Navigation.registerComponent('storytime_buddies_frontend.MyStories', () => MyStories);
  Navigation.registerComponent('storytime_buddies_frontend.MyComments', () => MyComments);
  Navigation.registerComponent('storytime_buddies_frontend.MyFriends', () => MyFriends);

  Navigation.registerComponent('storytime_buddies_frontend.UserDirectory', () => UserDirectory);
  Navigation.registerComponent('storytime_buddies_frontend.Settings', () => Settings);
  Navigation.registerComponent('storytime_buddies_frontend.Help', () => Help);
  Navigation.registerComponent('storytime_buddies_frontend.About', () => About);



}
