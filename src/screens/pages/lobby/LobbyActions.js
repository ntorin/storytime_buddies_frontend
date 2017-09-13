import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';



class LobbyActions extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 8 }}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.content}>{this.props.content}</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Button>Close</Button>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.3,
        backgroundColor: '#363636',
        borderRadius: 5,
        padding: 16,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});

export default LobbyActions;