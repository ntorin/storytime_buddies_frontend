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
                <View>
                    <Text style={styles.username}> Username</Text>
                </View>
                <View style={styles.userStats}>
                    <View style={styles.storiesStarted}>
                        <Text>Stories started</Text>
                    </View>
                    <View style={styles.storiesJoined}>
                        <Text>Stories joined</Text>
                    </View>

                    <View style={styles.libraryComments}>
                        <Text>Library comments</Text>
                    </View>

                    <View style={styles.totalViews}>
                        <Text>Total views</Text>
                    </View>
                </View>

                <Button onPress={() => this.viewStories()} textStyle={styles.buttonText} style={[styles.button,]}>
                    View Stories
                </Button>

                <Button onPress={() => this.viewComments()} textStyle={styles.buttonText} style={[styles.button,]}>
                    View Comments
                </Button>

                <View style={styles.friends}>
                    <Image />
                    <Text>Friends</Text>
                </View>

                <Button onPress={() => this.viewFriends()} textStyle={styles.buttonText} style={[styles.button,]}>
                    View Friends
                </Button>
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
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    button: {
        borderColor: '#ffffff',
        borderWidth: 1
    },

    buttonText: {
        color: '#ffffff'
    },

    username: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    userStats: {
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
    }
});

export default MyProfile;