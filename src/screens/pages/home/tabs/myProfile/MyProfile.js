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
                <View style={{width: Dimensions.get('window').width * 0.5,}}>
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

                <Button textStyle={styles.buttonText} style={[styles.button, {bottom: Dimensions.get('window').height * 0.65}]}>
                    View Stories
                </Button>

                <Button textStyle={styles.buttonText} style={[styles.button, {bottom: Dimensions.get('window').height * 0.55}]}>
                    View Comments
                </Button>

                <View style={styles.friends}>
                    <Image />
                    <Text>Friends</Text>
                </View>

                <Button textStyle={styles.buttonText} style={[styles.button, {bottom: Dimensions.get('window').height * 0.35}]}>
                    View Friends
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        left: Dimensions.get('window').width * 0.05,
        right: Dimensions.get('window').width * 0.05,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    button: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.4,
        bottom: Dimensions.get('window').height * 0.57,
        backgroundColor: '#41ddb8',
        right: Dimensions.get('window').width * 0.1,
        borderWidth: 0
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