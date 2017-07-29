import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import FriendItem from './FriendItem';

class Messages extends React.Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            friends: ds.cloneWithRows(['row 1', 'row 2',]),
        };
    }

     _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchFriends().then(() => {
            this.setState({ refreshing: false });
        });
    }

    fetchFriends() {
        //get list of stories
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                        dataSource={this.state.friends}
                        renderRow={(rowData) => <FriendItem friendName={rowData} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }>
                    </ListView>
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

export default Messages;