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
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies.json')
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({ lobbies: this.state.lobbies.cloneWithRows(responseJSON), refreshing: false });
            });
    }

    fetchLobbyStory(id) {
        //get list of lobbies
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/stories/' + id + '.json')
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({ lobbySelectedPreview: responseJSON.passage });
            });
    }



    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={() => this.filterQuery()} style={styles.searchBar} />
                <View style={styles.subContainer}>
                    <View style={styles.leftCol}>
                        <Button onPress={() => this.createLobby()} textStyle={styles.buttonText} style={[styles.button, styles.createLobby]}>
                            Create Lobby
                </Button>

                        <Button onPress={() => this.joinLobby()} textStyle={styles.buttonText} style={[styles.button, styles.joinLobby]}>
                            Join Lobby
                </Button>
                        <View style={styles.lobbyPreview}>
                            <Text>{this.state.lobbySelectedPreview}</Text>
                        </View>
                    </View>

                    <View style={styles.rightCol}>
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
                    </View>
                </View>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <Button onPress={() => this.onLobbySelected(rowData)} style={styles.listItem}>
                <View style={styles.rowContainer}>
                    <View style={styles.rowTopRow}>
                        <View style={styles.rowTopRowNameMembers}>
                            <Text style={styles.lobbyName}>{rowData.name}</Text>
                            <Text style={styles.lobbyMembers}>{rowData.members}</Text>
                        </View>
                        {this.renderLockIcon(rowData.has_password)}
                    </View>
                    <View style={styles.rowBottomRow}>
                        <Text style={styles.lobbyWordLimit}>{rowData.word_limit}</Text>
                        <Text style={styles.lobbyId}>{rowData.id}</Text>
                    </View>
                </View>
            </Button>
        )
    }

    renderLockIcon(hasPassword) {
        if(hasPassword){
        return <Text style={styles.lockIcon}>Locked</Text>
        }else{
            return <Text style={styles.lockIcon}/>
        }
    }

    onLobbySelected(rowData) {
        this.setState({ lobbySelected: rowData });
        this.fetchLobbyStory(rowData.id);
    }

    filterQuery() {
        //searches for the lobby by name, returns results in lobbylist
    }

    createLobby() {
        //moves the client into the create lobby screen
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.CreateLobby',
            title: 'Create a Lobby',
            passProps: {user_id: this.props.user_id}
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
        top: 20,
        padding: 5
    },

    subContainer: {
        flexDirection: 'row'
    },

    rowContainer: {
        flex: 1,
    },

    rowTopRow: {
        flex: 1,
        flexDirection: 'row'
    },

    rowTopRowNameMembers: {
        flex: 1,
    },


    rowBottomRow: {
        flex: 1,
        flexDirection: 'row'
    },

    leftCol: {
        flex: 1,
        padding: 5
    },

    rightCol: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    searchBar: {
        flex: 1,
        textAlign: 'center'
    },

    button: {
        backgroundColor: '#41ddb8',
        borderWidth: 0
    },

    createLobby: {
    },

    joinLobby: {
    },

    buttonText: {
        color: '#ffffff'
    },

    lobbyPreview: {
    },

    lobbyList: {

    },

    lobbyName: {
        flex: 1,
        fontSize: 12,
    },

    lobbyMembers: {
        flex: 1,
        fontSize: 12,
    },

    lobbyId: {
        flex: 1,
        fontSize: 12,
        textAlign: 'right'
    },

    lobbyWordLimit: {

    },

    listItem: {
        borderWidth: 0,
        flex: 1,
    },

    lockIcon: {
        flex: 1,
        fontSize: 10,
        textAlign: 'right'
    }
});

export default LobbyList;