import React from 'react';
import { StyleSheet, View, } from 'react-native';
import Chatlog from '../../../components/Chatlog';

class Lobby extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Chatlog/>
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
});

export default Lobby;