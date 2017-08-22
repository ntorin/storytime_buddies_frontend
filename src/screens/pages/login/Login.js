import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform, Alert } from 'react-native';
import { iconsMap, iconsLoaded } from '../../../helpers/icons-loader';
import { Navigation } from 'react-native-navigation';

import Button from 'apsl-react-native-button'

var tabs;

iconsLoaded.then(() => {
    tabs = [{
        label: 'Lobbies',
        screen: 'storytime_buddies_frontend.LobbyList',
        icon: iconsMap['pencil'],
        title: 'Available Lobbies',
    },
    {
        label: 'Library',
        screen: 'storytime_buddies_frontend.Library',
        icon: iconsMap['book-bookmark'],
        title: 'Story Library',
    },
    {
        label: 'Messages',
        screen: 'storytime_buddies_frontend.Messages',
        icon: iconsMap['chat'],
        title: 'Recent Messages',
    },
    {
        label: 'Profile',
        screen: 'storytime_buddies_frontend.MyProfile',
        icon: iconsMap['person'],
        title: 'Your Profile',
    }];


});


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseHeaders: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/img/loginbg.jpg')} style={styles.backgroundImage} >
                    <TextInput placeholder={'email'} onChangeText={(text) => this.setState({ email: text })} autoCorrect={false} autoCapitalize={'none'} style={[styles.credential, { bottom: Dimensions.get('window').height * 0.5 }]} />
                    <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text, })} autoCorrect={false} autoCapitalize={'none'} style={[styles.credential, { bottom: Dimensions.get('window').height * 0.4 }]} />
                    <Button onPress={() => this.loginUser()} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.3 }]}>
                        Login
                    </Button>
                    <Button onPress={() => this.registerUser()} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.2 }]}>
                        Register
                    </Button>
                </Image>
            </View>
        )
    }

    loginUser() {
        var body = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/api/v1/auth/sign_in',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
            .then((response) => {
                this.setState({ responseHeaders: response.headers.map, status: response.status })
                return (response.json())
            })
            .then((responseJSON) => {
                console.log(this.state.responseHeaders);
                console.log(responseJSON)
                if (this.state.status == 200) {
                    this.goToHome(this.state.responseHeaders['uid'], this.state.responseHeaders['client'], this.state.responseHeaders['access-token'], responseJSON.data.id);
                } else {
                    Alert.alert('Login Error',
                        responseJSON.errors[0],
                        [{ text: "OK", }])
                }
            });
    }

    registerUser() {
        var body = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/api/v1/auth/',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
            .then((response) => {
                this.setState({ responseHeaders: response.headers.map, status: response.status })
                return (response.json())
            })
            .then((responseJSON) => {
                console.log(this.state.responseHeaders);
                console.log(responseJSON)
                if (this.state.status == 200) {
                    this.goToHome(this.state.responseHeaders['uid'], this.state.responseHeaders['client'], this.state.responseHeaders['access-token'], responseJSON.data.id);
                } else {
                    Alert.alert('Registration Error',
                        responseJSON.errors.full_messages[0],
                        [{ text: "OK", }])
                }
            });
    }

    goToHome(uid, client, access_token, user_id) {
        var props = {
            uid: uid,
            client: client,
            access_token: access_token,
            user_id: user_id
        }

        Navigation.startTabBasedApp({
            tabs,
            animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
            tabsStyle: {
                tabBarBackgroundColor: '#3bc9a7',
                navBarButtonColor: '#ffffff',
                tabBarButtonColor: '#ffffff',
                navBarTextColor: '#ffffff',
                tabBarSelectedButtonColor: '#ff505c',
                navigationBarColor: '#3bc9a7',
                navBarBackgroundColor: '#3bc9a7',
                statusBarColor: '#34b092',
                tabFontFamily: 'BioRhyme-Bold',
            },
            appStyle: {
                tabBarBackgroundColor: '#3bc9a7',
                navBarButtonColor: '#ffffff',
                tabBarButtonColor: '#ffffff',
                navBarTextColor: '#ffffff',
                tabBarSelectedButtonColor: '#fbf5a9',
                navigationBarColor: '#000000',
                navBarBackgroundColor: '#3bc9a7',
                statusBarColor: '#34b092',
                tabFontFamily: 'BioRhyme-Bold',
            },
            drawer: {
                left: {
                    screen: 'storytime_buddies_frontend.Nav',
                    passProps: props
                }
            },
            passProps: props
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
        right: Dimensions.get('window').width * 0.15,
        backgroundColor: '#41ddb8',
        borderWidth: 0
    },

    buttonText: {
        color: '#ffffff'
    }
});

export default Login;