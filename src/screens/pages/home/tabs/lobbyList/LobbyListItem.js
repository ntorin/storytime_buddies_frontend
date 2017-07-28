import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';

class LobbyListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lobbyName: this.props.lobbyName,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{this.state.lobbyName}</Text>
            </View>
        )
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
});

export default LobbyListItem;