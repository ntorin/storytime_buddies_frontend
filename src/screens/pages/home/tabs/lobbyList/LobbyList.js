import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';

var lobbyList = [
    {
        "id": 1,
        "name": "Split Been",
        "has_password": false,
        "password": "",
        "word_limit": null,
        "master_user_id": 0,
        "members": 0,
        "created_at": "2017-08-08T09:15:24.377Z",
        "updated_at": "2017-08-08T09:15:24.377Z",
        "url": "http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies/1.json"
    }
]

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class LobbyList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            lobbyList: lobbyList,
            lobbies: ds.cloneWithRows(lobbyList),
            lobbySelected: 0,
            lobbySelectedPreview: 'Select a lobby to view its story here.'
        };

        this.fetchLobbies()
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchLobbies();
    }

    fetchLobbies() {
        //get list of lobbies
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies.json')
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({lobbies: this.state.lobbies.cloneWithRows(responseJSON), refreshing: false });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={() => this.filterQuery()} style={styles.searchBar} />
                <Button onPress={() => this.createLobby()} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.57 }]}>
                    Create Lobby
                </Button>

                <Button onPress={() => this.joinLobby()} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.47 }]}>
                    Join Lobby
                </Button>

                <View style={styles.lobbyList}>
                    <ListView
                        dataSource={this.state.lobbies}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        renderRow={this.renderRow.bind(this)} />
                </View>

                <View style={styles.lobbyPreview}>
                    <Text>{this.state.lobbySelectedPreview}</Text>
                </View>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <Button onPress={() => this.onLobbySelected(rowData)} style={styles.listItem}>
                <Text>{rowData.name}</Text>
                <Text>{rowData.members}</Text>
                <Text>{rowData.has_password}</Text>
                <Text>{rowData.id}</Text>
            </Button>
        )
    }

    onLobbySelected(rowData) {
        console.log(rowData.id);
        this.setState({ lobbySelected: rowData, lobbySelectedPreview: rowData.lobbyPreview })
    }

    filterQuery() {
        //searches for the lobby by name, returns results in lobbylist
    }

    createLobby() {
        //moves the client into the create lobby screen
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.CreateLobby',
            title: 'Create a Lobby'
        });
    }

    joinLobby() {
        //moves the client into the desired lobby
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.Lobby',
            title: 'LOBBYNAME',
            passProps: { lobby: this.state.lobbySelected }
        });
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
    },

    listItem: {
        borderWidth: 0
    },
});

export default LobbyList;