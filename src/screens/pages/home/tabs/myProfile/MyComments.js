import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class MyComments extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
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

export default MyComments;