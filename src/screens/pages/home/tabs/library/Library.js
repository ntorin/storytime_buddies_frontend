import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';
import SegmentedControlTab from 'react-native-segmented-control-tab';


var storyList = [
    {
        "id": 9,
        "name": "Everything is Illuminated",
        "author_id": 5,
        "passage": "Odio et quas quo aut fuga laborum. Eos nesciunt quam qui libero assumenda. Voluptatem aperiam unde reprehenderit aut.",
        "editing": false,
        "completed": true,
        "likes": 91,
        "views": 3
    },
]

class Library extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            selectedIndex: 0,
            refreshing: false,
            storyList: storyList,
            stories: ds.cloneWithRows([]),
            offset: 0,
            limit: 20,
            query: '',
            sort: 'popular'
        };
        this.fetchStories()
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchStories();
    }

    handleIndexChange = (index) => {
        this.setState({ selectedIndex: index });
        switch (index) {
            case 0:
                this.setState({ sort: 'popular' });
                break;

            case 1:
                this.setState({ sort: 'recent' });
                break;
        }
        this.fetchStories();
    }

    fetchStories() {
        var body = JSON.stringify({
            query: this.state.query,
            offset: this.state.offset,
            limit: this.state.limit,
            sort: this.state.sort
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/stories/retrieve/',
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
                this.setState({ stories: this.state.stories.cloneWithRows(responseJSON), refreshing: false });
                console.log(this.state.stories);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22' placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={this.filterQuery} style={[styles.searchBar]} />

                <SegmentedControlTab
                    values={['Popular', 'Recent']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                />

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
            <View>
            <Button onPress={() => this.goToStory(rowData)} style={styles.listItem}>
                <View style={styles.rowContainer}>
                    <View style={styles.rowTopRow}>
                        <View style={styles.rowTopRowNameCompleted}>
                            <Text style={[styles.white, styles.name]}>{rowData.name}</Text>
                            <Text style={[styles.white, styles.completed]}>{rowData.completed}</Text>
                        </View>
                    </View>
                    <View style={styles.rowBottomRow}>
                        <Text style={[styles.white, styles.views]}>{rowData.views} views</Text>
                        <Text style={[styles.white, styles.likes]}>{rowData.likes} likes</Text>
                        <Text style={[styles.white, styles.id]}>{rowData.id}</Text>
                    </View>
                </View>
            </Button>
            </View>
        )
    }

    goToStory(rowData) {
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.Story',
            title: rowData.name,
            passProps: { story: rowData, user: this.props.user }
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
        textAlign: 'center',
        color: "#ffffff",
    },

    button: {
        borderColor: '#ffffff',
        borderWidth: 1
    },

    buttonText: {
        color: '#ffffff'
    },

    libraryResults: {
        flex: 1,
        //alignItems: 'flex-start'
    },

    listItem: {
        borderWidth: 0,
        flex: 1
    },

    tabsContainerStyle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },

    tabStyle: {
        backgroundColor: 'transparent',
        borderColor: '#e14f22'
    },

    tabTextStyle: {
        color: '#e14f22'
    },

    activeTabStyle: {
        backgroundColor: '#e14f22'
    },

    activeTabTextStyle: {
        color: '#ffffff'
    },

    rowContainer: {
        flex: 1,
        padding: 5
    },

    rowTopRow: {

    },

    rowTopRowNameCompleted: {
        flexDirection: 'row'
    },

    rowBottomRow: {
        flexDirection: 'row'
    },

    completed: {
        textAlign: 'right',
        flex: 3
    },

    likes: {
        flex: 1,
        textAlign: 'center'
    },

    views: {
        flex: 1,
    },

    id: {
        flex: 1,
        textAlign: 'right'
    },

    white: {
        color: '#ffffff',
    },

    name: {
        fontWeight: 'bold',
        flex: 7,
    }

});

export default Library;