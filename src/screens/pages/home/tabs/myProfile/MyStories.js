import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';

var storyList = [
    {
        storyName: 'STORYNAME',
        storyPreview: 'STORYPREVIEW',
        storyCompleted: true,
        storyLikes: 0
    },
]

class MyStories extends React.Component {

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
                <Text>{rowData.storyName}</Text>
                <Text>{rowData.storyPreview}</Text>
                <Text>{rowData.storyCompleted}</Text>
                <Text>{rowData.storyLikes}</Text>
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

export default MyStories;