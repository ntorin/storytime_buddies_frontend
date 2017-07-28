import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';
import LobbyListItem from './LobbyListItem';

class LobbyList extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            lobbies: ds.cloneWithRows(['row 1', 'row 2',]),
        };
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchLobbies().then(() => {
            this.setState({ refreshing: false });
        });
    }

    fetchLobbies() {
        //get list of lobbies
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={this.filterQuery} style={styles.searchBar} />
                <Button onPress={this.createLobby} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.57 }]}>
                    Create Lobby
                </Button>

                <Button onPress={this.joinLobby} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.47 }]}>
                    Join Lobby
                </Button>

                <View style={styles.lobbyList}>
                    <ListView
                        dataSource={this.state.lobbies}
                        renderRow={(rowData) => <LobbyListItem lobbyName={rowData} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }>
                    </ListView>
                </View>

                <View style={styles.lobbyPreview}>
                    <Text>lobby preview</Text>
                </View>
            </View>
        )
    }

    filterQuery() {
        //searches for the lobby by name, returns results in lobbylist
    }

    joinLobby() {
        //moves the client into the desired lobby
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
        left: Dimensions.get('window').width * 0.05,
        right: Dimensions.get('window').width * 0.05,
        backgroundColor: '#41ddb8',
        borderWidth: 0
    },

    buttonText: {
        color: '#ffffff'
    },

    lobbyPreview: {
        position: 'absolute',
        left: Dimensions.get('window').width * 0.05,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.5,
        top: Dimensions.get('window').height * 0.3
    },

    lobbyList: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.8,
        left: Dimensions.get('window').width * 0.5,
        right: Dimensions.get('window').width * 0.025,
        top: Dimensions.get('window').height * 0.08
    }
});

export default LobbyList;