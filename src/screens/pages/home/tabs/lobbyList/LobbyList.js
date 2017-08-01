import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';
import LobbyListItem from './LobbyListItem';

var lobbyList = [
    {
        lobbyName: 'LOBBYNAME',
        lobbyMembers: 'LOBBYMEMBERS',
        lobbyHasPassword: false,
        lobbyId: 1,
        lobbyPreview: 'LOBBYPREVIEW1' 
    }
]

class LobbyList extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            lobbyList: lobbyList,
            lobbies: ds.cloneWithRows(lobbyList),
            lobbySelected: 0,
            lobbySelectedPreview: 'Select a lobby to view its story here.'
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

    renderRow(rowData){
        return(
                <Button onPress={() => this.onLobbySelected(rowData)} style={styles.listItem}>
                    <Text>{rowData.lobbyName}</Text>
                    <Text>{rowData.lobbyMembers}</Text>
                    <Text>{rowData.lobbyHasPassword}</Text>
                    <Text>{rowData.lobbyId}</Text>
                </Button>
        )
    }

    onLobbySelected(rowData){
        console.log(rowData.lobbyId);
        this.setState({lobbySelected: rowData.lobbyId, lobbySelectedPreview: rowData.lobbyPreview})
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
            passProps: {}
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