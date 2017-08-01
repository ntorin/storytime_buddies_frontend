import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';

class Story extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            storyName: 'STORYNAME',
            storyPreview: 'STORYPREVIEW',
            storyPassage: 'STORYPASSAGE',
            storyCompleted: true,
            storyLikes: 0
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{this.state.storyName}</Text>
                <Text>{this.state.storyPassage}</Text>
                <Text>{this.state.storyCompleted}</Text>
                <Text>{this.state.storyLikes}</Text>
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

export default Story;