import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';

class MyProfile extends React.Component {

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
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
});

export default MyProfile;