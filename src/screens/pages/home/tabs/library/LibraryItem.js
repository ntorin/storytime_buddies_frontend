import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';

class LibraryItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            storyName: this.props.storyName,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{this.state.storyName}</Text>
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

export default LibraryItem;