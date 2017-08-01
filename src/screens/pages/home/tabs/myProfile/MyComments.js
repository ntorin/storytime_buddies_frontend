import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';

var commentList = [
    {
        commentId: 'COMMENTID',
        commentText: 'COMMENTTEXT',
        commentDate: new Date().toDateString(),
        commentLikes: 0
    },
]

class MyComments extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            commentList: commentList,
            stories: ds.cloneWithRows(commentList),
        };
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchComments().then(() => {
            this.setState({ refreshing: false });
        });
    }

    fetchComments() {
        //get list of stories
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={this.filterQuery} style={styles.searchBar} />
                <View style={styles.libraryResults}>
                    <ListView
                        dataSource={this.state.stories}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <Button onPress={() => this.goToStory(rowData)} style={styles.listItem}>
                <Text>{rowData.commentText}</Text>
                <Text>{rowData.commentDate}</Text>
                <Text>{rowData.commentLikes}</Text>
            </Button>
        )
    }

    goToStory(rowData){
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.Story',
            title: 'STORYNAME',
            passProps: {story: rowData}
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
        bottom: Dimensions.get('window').height * 0.57,
        backgroundColor: '#41ddb8',
        borderWidth: 0
    },

    buttonText: {
        color: '#ffffff'
    },

    libraryResults: {
        position: 'absolute',
        height: Dimensions.get('window').height * 0.8,
        top: Dimensions.get('window').height * 0.2,
        left: Dimensions.get('window').width * 0.025,
        right: Dimensions.get('window').width * 0.025,
    },

    listItem: {
        borderWidth: 0
    },
});

export default MyComments;