import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform } from 'react-native';
import { iconsMap, iconsLoaded } from '../../../helpers/icons-loader';
import { Navigation } from 'react-native-navigation';

import Button from 'apsl-react-native-button'

var tabs;

iconsLoaded.then(() => {
    tabs = [{
        label: 'Navigation',
        screen: 'storytime_buddies_frontend.Types',
        icon: iconsMap['ios-person'],
        title: 'Navigation Types',
    }, {
        label: 'Actions',
        screen: 'storytime_buddies_frontend.Actions',
        icon: iconsMap['ios-people'],
        title: 'Navigation Actions',
    }];

    if (Platform.OS === 'android') {
        tabs.push({
            label: 'Transitions',
            screen: 'storytime_buddies_frontend.Transitions',
            icon: iconsMap['ios-chatbubbles'],
            title: 'Navigation Transitions',
        });
    }

});


class Login extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/img/loginbg.jpg')} style={styles.backgroundImage} >
                    <TextInput placeholder={'username'} autoCorrect={false} autoCapitalize={'none'} style={[styles.credential, { bottom: Dimensions.get('window').height * 0.5 }]} />
                    <TextInput placeholder={'password'} autoCorrect={false} autoCapitalize={'none'} style={[styles.credential, { bottom: Dimensions.get('window').height * 0.4 }]} />
                    <Button onPress={this.goToHome} style={[styles.button, { bottom: Dimensions.get('window').height * 0.3 }]}>
                        Login
                    </Button>
                    <Button onPress={this.registerUser} style={[styles.button, { bottom: Dimensions.get('window').height * 0.2 }]}>
                        Register
                    </Button>
                </Image>
            </View>
        )
    }

    loginUser() {
        this.goToHome();
    }

    registerUser() {
        this.goToHome();
    }

    goToHome() {
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
                    screen: 'storytime_buddies_frontend.Types.Drawer'
                }
            }
        });
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    credential: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.7,
        left: Dimensions.get('window').width * 0.15,
        bottom: Dimensions.get('window').height * 0.5
    },

    button: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.7,
        left: Dimensions.get('window').width * 0.15,
        right: Dimensions.get('window').width * 0.15
    }
});

export default Login;