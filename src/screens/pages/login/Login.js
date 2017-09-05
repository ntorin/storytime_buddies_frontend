import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform, Alert, findNodeHandle, InteractionManager, } from 'react-native';
import { iconsMap, iconsLoaded } from '../../../helpers/icons-loader';
import { Navigation } from 'react-native-navigation';
import { BlurView } from 'react-native-blur';
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

var img = require('../../../assets/img/2.jpg');

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseHeaders: '',
            viewRef: null
        };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    ref={(img) => { this.backgroundImage = img; }}
                    source={img}
                    style={[styles.backgroundImage, styles.absolute]}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />
                {this.state.viewRef && <BlurView
                    style={styles.absolute}
                    viewRef={this.state.viewRef}
                    blurType="dark"
                    blurAmount={100}
                />}
                <View>
                    <Text>Testaaaaaaaaaa@@@@@@@@@@aaaaaaaa</Text>
                    <TextInput placeholder={'email'} placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22' textAlign='center' onChangeText={(text) => this.setState({ email: text })} autoCorrect={false} autoCapitalize={'none'} returnKeyType={'next'} style={styles.credential} />
                    <TextInput placeholder={'password'} placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22' textAlign='center' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text, })} autoCorrect={false} autoCapitalize={'none'} style={styles.credential} />
                    <Button onPress={() => this.loginUser()} textStyle={styles.buttonText} style={styles.button}>
                        Login
                    </Button>
                    <Button onPress={() => this.registerUser()} textStyle={styles.buttonText} style={styles.button}>
                        Register
                    </Button>
                </View>
            </View>
        )
    }

    loginUser() {
        var body = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        });
        console.log(body);
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
                        'a' + responseJSON.errors[0],
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
        console.log(body);
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
                tabBarBackgroundColor: '#363636',
                navBarButtonColor: '#ffffff',
                tabBarButtonColor: '#ffffff',
                navBarTextColor: '#ffffff',
                tabBarSelectedButtonColor: '#e14f22',
                navigationBarColor: '#363636',
                navBarBackgroundColor: '#e14f22',
                statusBarColor: '#000000',
                tabFontFamily: 'BioRhyme-Bold',
            },
            appStyle: {
                tabBarBackgroundColor: '#363636',
                navBarButtonColor: '#ffffff',
                tabBarButtonColor: '#ffffff',
                navBarTextColor: '#ffffff',
                tabBarSelectedButtonColor: '#e14f22',
                navigationBarColor: '#000000',
                navBarBackgroundColor: '#363636',
                statusBarColor: '#000000',
                tabFontFamily: 'BioRhyme-Bold',
                screenBackgroundColor: '#4e4e4e'
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    backgroundImage: {
        backgroundColor: 'transparent',
        flex: 1,
        resizeMode: 'cover',
        left: 500
    },

    credential: {
        color: "#ffffff", //Expecting this to change input text color
    },

    button: {
        borderColor: '#ffffff',
        borderWidth: 1
    },

    buttonText: {
        color: '#ffffff'
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
});

export default Login;