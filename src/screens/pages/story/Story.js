import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl, ScrollView } from 'react-native';
import Button from 'apsl-react-native-button';
import ActionCable from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider';


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

var comment = {
    "id": 1,
    "username": null,
    "comment": "Labore hic nihil expedita.",
    "likes": 430,
    "story_id": 1,
    "user_id": 2
}

const cable = ActionCable.createConsumer('ws://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/cable');

class Story extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            refreshing: false,
            story: this.props.story,

            commentData: [{}],

            comments: ds.cloneWithRows([])
        }

        var t = this;
        cable.subscriptions.create(
            { channel: "StoryChannel", room: this.props.story.id },
            {
                received(msg) {
                    console.log(msg)
                    t.setState({ commentData: t.state.commentData.concat(msg) })
                    t.setState({ comments: ds.cloneWithRows(t.state.commentData) })
                }
            }
        );

        this.fetchComments();
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchComments();
    }

    fetchComments() {
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/library_comments/retrieve/' + this.state.story.id)
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({ comments: this.state.comments.cloneWithRows(responseJSON), refreshing: false });
                console.log(this.state.comments);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.storyContainer}>
                    <ScrollView>
                        <Text style={[styles.white, styles.passage]}>{this.state.story.passage}</Text>
                    </ScrollView>
                    <View style={styles.storyContainerViewsLikesCompleted}>
                        <Text style={[styles.white, styles.views]}>{this.state.story.views} views</Text>
                        <Text style={[styles.white, styles.storyLikesText]}>{this.state.story.likes} likes</Text>
                        <Text style={[styles.white, styles.completed]}>{this.state.story.completed}</Text>
                    </View>
                </View>
                <View style={styles.commentsContainer}>
                    <Text style={[styles.white, styles.commentsHeader]}>Comments</Text>
                    <View style={styles.storyComments}>
                        <ListView
                            dataSource={this.state.comments}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            renderRow={this.renderRow.bind(this)}
                        />
                    </View>
                    <View style={styles.commentInput}>
                        <TextInput ref={component => this._chatInput = component}
                            placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22'
                            placeholder={'write a comment...'} onChangeText={(text) => this.setState({ commentInput: text })} autoCapitalize={'none'} style={{ flex: 8 }} />
                        <Button onPress={() => this.onSendCommentInput()} textStyle={styles.buttonText} style={styles.sendButton}>
                            Send
                        </Button>
                    </View>
                </View>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <View style={styles.commentMessage}>
                <Text style={[styles.white, styles.username]}>username {rowData.username}</Text>
                <Text style={styles.white}>{rowData.comment}</Text>
                <View>
                    <Text style={styles.white}>{rowData.likes} likes</Text>
                </View>
            </View>
        )
    }


    onLikeStory() {

    }

    onLikeStoryComment() {

    }

    onSendCommentInput() {
        if (this.state.comment.trim() != '') {
            var input = this.state.commentInput;
            var body = JSON.stringify({
                comment: input,
                story_id: this.state.story.id,
                user_id: this.props.user.id,
                username: this.props.user.nickname,
                likes: 0
            });

            fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/library_comments.json',
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: body
                })
                .then((response) => {
                    return (response.json())
                })
                .then((responseJSON) => {
                    console.log(responseJSON)
                })

            this.setState({ commentInput: '' });
            this._chatInput.setNativeProps({ text: '' });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#4e4e4e'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    passage: {
        fontSize: 18,
    },

    completed: {

    },

    storyLikes: {
        flex: 1,
        borderWidth: 0,
    },

    commentLikes: {
        flex: 1,
        borderWidth: 0,
    },

    storyLikesText: {
        flex: 1,
        textAlign: 'center'
    },

    views: {
        flex: 1,
        textAlign: 'center'
    },

    storyContainerViewsLikesCompleted: {
        flexDirection: 'row'
    },

    storyContainer: {
        flex: 5
    },

    commentsContainer: {
        flex: 5
    },

    commentInput: {
        flexDirection: 'row'
    },

    commentsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    storyComments: {
        flex: 1,
    },

    commentMessage: {
        flex: 1
    },

    message: {

    },

    username: {
        fontWeight: 'bold',
    },

    white: {
        color: '#ffffff',
    },

    sendButton: {
        borderColor: '#e14f22',
        borderWidth: 1
    },

    buttonText: {
        color: '#e14f22'
    },
});

export default Story;