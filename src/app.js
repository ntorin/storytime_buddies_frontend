import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';
import { iconsMap, iconsLoaded } from './helpers/icons-loader';


iconsLoaded.then(() => {
  // screen related book keeping
  registerScreens();

  const tabs = [{
    label: 'Navigation',
    screen: 'react_native_skeleton.Types',
    icon: iconsMap['ios-person'],
    title: 'Navigation Types',
  }, {
    label: 'Actions',
    screen: 'react_native_skeleton.Actions',
    icon: require('../img/swap.png'),
    title: 'Navigation Actions',
  }];

  if (Platform.OS === 'android') {
    tabs.push({
      label: 'Transitions',
      screen: 'react_native_skeleton.Transitions',
      icon: require('../img/transform.png'),
      title: 'Navigation Transitions',
    });
  }

  startApp();

  function startApp() {
    // this will start our app
    Navigation.startTabBasedApp({
      tabs,
      animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
      tabsStyle: {
        tabBarBackgroundColor: '#003a66',
        navBarButtonColor: '#ffffff',
        tabBarButtonColor: '#ffffff',
        navBarTextColor: '#ffffff',
        tabBarSelectedButtonColor: '#ff505c',
        navigationBarColor: '#003a66',
        navBarBackgroundColor: '#003a66',
        statusBarColor: '#002b4c',
        tabFontFamily: 'BioRhyme-Bold',
      },
      appStyle: {
        tabBarBackgroundColor: '#003a66',
        navBarButtonColor: '#ffffff',
        tabBarButtonColor: '#ffffff',
        navBarTextColor: '#ffffff',
        tabBarSelectedButtonColor: '#ff505c',
        navigationBarColor: '#003a66',
        navBarBackgroundColor: '#003a66',
        statusBarColor: '#002b4c',
        tabFontFamily: 'BioRhyme-Bold',
      },
      drawer: {
        left: {
          screen: 'react_native_skeleton.Types.Drawer'
        }
      }
    });
  }

});