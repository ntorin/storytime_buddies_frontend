import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';
import Button from 'apsl-react-native-button';

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={styles.userStats}>
                        <View>
                            <Text style={[styles.white, styles.username]}>{this.props.user.nickname}</Text>
                        </View>
                        <View>
                            <Text style={[styles.white, styles.storiesStarted]}>Stories started</Text>
                            <Text style={[styles.white, styles.storiesJoined]}>Stories joined</Text>
                            <Text style={[styles.white, styles.libraryComments]}>Library comments</Text>
                            <Text style={[styles.white, styles.totalViews]}>Total views</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button onPress={() => this.viewStories()} textStyle={styles.buttonText} style={[styles.button,]}>
                            View Stories
                    </Button>
                        <Button onPress={() => this.viewComments()} textStyle={styles.buttonText} style={[styles.button,]}>
                            View Comments
                    </Button>
                    </View>
                </View>
            </View>
        )
    }

    viewStories() {
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.MyStories',
            title: 'Your Stories'
        });
    }

    viewComments() {
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.MyComments',
            title: 'Your Comments'
        });
    }

    viewFriends() {
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.MyFriends',
            title: 'Friend List'
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },

    profileContainer: {
        flexDirection: 'row'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    button: {
        borderColor: '#e14f22',
        borderWidth: 1
    },

    buttonText: {
        color: '#e14f22'
    },

    username: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    userStats: {
        flex: 1
    },

    buttonContainer: {
        flex: 1
    },

    storiesStarted: {
    },

    storiesJoined: {
    },

    libraryComments: {
    },

    totalViews: {
    },

    friends: {
    },

    white: {
        color: '#ffffff',
    },
});

export default MyProfile;