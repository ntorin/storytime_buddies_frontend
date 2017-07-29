import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';

class FriendItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            friendName: this.props.friendName,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{this.state.friendName}</Text>
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

export default FriendItem;