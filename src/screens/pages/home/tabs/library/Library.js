import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';
import LibraryItem from './LibraryItem';

var storyList = [
    {
        storyName: 'STORYNAME'
    },
]

class Library extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            storyList: storyList,
            stories: ds.cloneWithRows(storyList),
        };
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchStories().then(() => {
            this.setState({ refreshing: false });
        });
    }

    fetchStories() {
        //get list of stories
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={this.filterQuery} style={styles.searchBar} />
                <Button onPress={this.createLobby} textStyle={styles.buttonText} style={[styles.button, { left: Dimensions.get('window').width * 0.05 }]}>
                    Popular
                </Button>

                <Button onPress={this.joinLobby} textStyle={styles.buttonText} style={[styles.button, { right: Dimensions.get('window').width * 0.05 }]}>
                    Recent
                </Button>

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
            <Button onPress={() => this.goToStory()} style={styles.listItem}>
                <Text>{rowData.storyName}</Text>
            </Button>
        )
    }

    goToStory(){
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.Story',
            title: 'STORYNAME',
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

export default Library;