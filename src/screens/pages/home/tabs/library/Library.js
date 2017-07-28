import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';
import Button from 'apsl-react-native-button';
import Masonry from '../../../../transitions/sharedElementTransitions/Masonry/Masonry';

class Library extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={this.filterQuery} style={styles.searchBar} />
                <Button onPress={this.createLobby} textStyle={styles.buttonText} style={[styles.button, { left: Dimensions.get('window').width * 0.05}]}>
                    Popular
                </Button>

                <Button onPress={this.joinLobby} textStyle={styles.buttonText} style={[styles.button, { right: Dimensions.get('window').width * 0.05 }]}>
                    Recent
                </Button>

                <View style={styles.libraryResults}>
                    <Masonry/>
                </View>
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

    searchBar: {
        textAlign: 'center'
    },

    button: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.4,
        bottom: Dimensions.get('window').height * 0.57,
        backgroundColor: '#41ddb8',
        borderWidth: 0
    },

    buttonText: {
        color: '#ffffff'
    },

    libraryResults: {

    }
});

export default Library;