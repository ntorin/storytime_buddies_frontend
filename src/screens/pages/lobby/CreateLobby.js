//possible modal
import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Button from 'apsl-react-native-button';


class CreateLobby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            word_limit: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22' 
                placeholder={'Lobby Name'} onChangeText={(text) => this.setState({ name: text })} autoCorrect={false} autoCapitalize={'words'} />
                <TextInput placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22' 
                placeholder={'Word Limit (default: 5)'} onChangeText={(text) => this.setState({ word_limit: text })} autoCorrect={false} keyboardType={'numeric'} autoCapitalize={'words'} />
                <TextInput placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22' 
                placeholder={'Password (optional)'} onChangeText={(text) => this.setState({ password: text })} autoCorrect={false} autoCapitalize={'words'} />

                <Button onPress={() => this.onSubmit()} textStyle={styles.buttonText} style={styles.button} >
                    Create Lobby
                </Button>
            </View>
        )
    }

    onSubmit() {
        //closes creation window and moves the client into the created lobby
        var has_password = false;
        if (this.state.password.trim() != '') {
            has_password = true;
        }

        if(this.state.name.trim() == ''){
             Alert.alert('Creation Error',
                'The lobby must have a name.',
                [{ text: "OK" }])
                return;
        }

        if (parseInt(this.state.word_limit) == 'NaN') {
            Alert.alert('Creation Error',
                'The lobby\'s word limit must be a whole number.',
                [{ text: "OK" }])
                return;
        }

        if (this.state.word_limit.trim() == '') {
            this.setState({ word_limit: '5' })
        }
        var body = JSON.stringify({
            name: this.state.name,
            has_password: has_password,
            password: this.state.password,
            word_limit: parseInt(this.state.word_limit),
            master_user_id: this.props.user.id,
            members: 0
        });
        
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies.json',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
            .then((response) => {
                return (response.json())
            })
            .then((responseJSON) => {
                console.log(responseJSON)
                /* this.props.navigator.pop({
                    animated: true,
                    animationType: 'fade',
                });

                this.props.navigator.push({
                    screen: 'storytime_buddies_frontend.Lobby',
                    title: responseJSON.name,
                    passProps: { responseJSON }
                }); */
            })



    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4e4e4e'
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
});

export default CreateLobby;