import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';

var friendList = [
    {
        friendName: 'FRIENDNAME',
        friendLastMessage: 'FRIENDLASTMESSAGE',
        friendMessageDate: new Date().toDateString(),
        friendNumberUnread: 1,
    },
]

class Messages extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            friendList: friendList,
            friends: ds.cloneWithRows([friendList])
        };
        this.fetchFriends()
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchFriends();
    }

    fetchFriends() {
        var body = JSON.stringify({
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/users/friends/' + this.props.user.id,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({ friends: this.state.friends.cloneWithRows(responseJSON), refreshing: false });
                console.log(this.state.friends);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22'
                    placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={() => this.filterQuery()} style={styles.searchBar} />
                <ListView
                    dataSource={this.state.friends}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                    renderRow={this.renderRow.bind(this)} />

            </View>
        )
    }

    renderRow(rowData) {
        var friendName;
        var friendId;
        if (this.props.user.id == rowData.user_id) {
            friendName = rowData.friendname;
            friendId = rowData.friend_id;
        } else {
            friendName = rowData.username;
            friendId = rowData.user_id;
        }


        return (
            <Button onPress={() => this.goToChat(rowData)} style={styles.listItem}>
                <View style={styles.rowTopRow}>
                    <Text style={[styles.white, styles.friendName]}>{friendName}</Text>
                    <Text style={[styles.white, styles.lastMessageAt]}>{rowData.last_message_at}</Text>
                </View>
                <View style={styles.rowBottomRow}>
                    <Text style={[styles.white, styles.lastMessage]}>{rowData.last_message}</Text>
                </View>
            </Button>
        )
    }

    goToChat(rowData) {
        var friendName;
        var friendId;
        if (this.props.user.id == rowData.user_id) {
            friendName = rowData.friendname;
            friendId = rowData.friend_id;
        } else {
            friendName = rowData.username;
            friendId = rowData.user_id;
        }
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.Chat',
            title: 'Chat with ' + friendName,
            passProps: { friend: rowData, user: this.props.user, friendName: friendName, friendId: friendId }
        });
    }

    filterQuery() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    searchBar: {
        textAlign: 'center',
        color: "#ffffff",
    },

    listItem: {
        borderWidth: 0
    },

    rowTopRow: {
        flex: 1,
        flexDirection: 'row'
    },

    rowBottomRow: {
        flex: 1
    },

    friendName: {
        flex: 1,
        fontWeight: 'bold'
    },

    lastMessageAt: {
        flex: 1,
        textAlign: 'right'
    },

    lastMessage: {

    },

    white: {
        color: '#ffffff',
    },
});

export default Messages;