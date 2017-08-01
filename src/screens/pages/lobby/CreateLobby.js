//possible modal
import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Button from 'apsl-react-native-button';


class CreateLobby extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Lobby Name'} autoCorrect={false} autoCapitalize={'words'} />
                <TextInput placeholder={'Word Limit (default: 5)'} autoCorrect={false} keyboardType={'numeric'} autoCapitalize={'words'} />
                <TextInput placeholder={'Password (optional)'} autoCorrect={false} autoCapitalize={'words'} />

                <Button onPress={() => this.onSubmit()} textStyle={styles.buttonText} style={styles.button} >
                    Create Lobby
                </Button>
            </View>
        )
    }

    onSubmit() {
        //closes creation window and moves the client into the created lobby
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });

        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.Lobby',
            title: 'LOBBYNAME',
            passProps: {}
        });
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

    button: {
        backgroundColor: '#41ddb8',
        borderWidth: 0
    },

    buttonText: {
        color: '#ffffff'
    },
});

export default CreateLobby;