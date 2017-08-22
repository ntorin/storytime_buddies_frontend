import React from 'react';
import { StyleSheet, View, } from 'react-native';
import Chatlog from '../../../components/Chatlog';

class Lobby extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.lobby);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.storyContainer}>
                </View>
                <View style={styles.chatlogContainer}>
                    <Chatlog />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    storyContainer: {
        flex: 2,
    },

    chatlogContainer: {
        flex: 1,
    },
});

export default Lobby;