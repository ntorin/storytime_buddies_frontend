import React from 'react';
import { StyleSheet, View, ScrollView, ListView, Text, TextInput } from 'react-native';
import Chatlog from '../../../components/Chatlog';
import ActionCable from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider';
import Button from 'apsl-react-native-button';



const cable = ActionCable.createConsumer('ws://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/cable');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


class Lobby extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.lobby)
        this.state = {
            storyPassage: '',
            storyInput: '',
            chatInput: '',
            story: {
                name: ''
            },

            messageData: [{}],

            lobbyMessages: ds.cloneWithRows([
                {
                    user_id: '',
                    message: ''
                }
            ]),

            memberCount: 0,

            memberData: [{
                user_id: '',
                username: ''
            }],

            memberList: ds.cloneWithRows({})

        }
        var t = this;
        cable.subscriptions.create(
            { channel: "LobbyChannel", room: this.props.lobby.id },
            {
                received(msg) {
                    console.log(msg)
                    t.setState({ messageData: t.state.messageData.concat(msg) })
                    t.setState({ lobbyMessages: ds.cloneWithRows(t.state.messageData) })
                }
            }
        );

        this.fetchStory();
        this.fetchMemberList();
    }

    fetchStory() {
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/stories/' + this.props.lobby.id + '.json')
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({ story: responseJSON, storyPassage: responseJSON.passage });
            });
    }

    fetchMemberList() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.storyContainer}>
                    <View style={styles.storyPassage}>
                        <View>
                            <Text style={styles.storyTitle}>{this.state.story.name}</Text>
                        </View>
                        <ScrollView>
                            <Text>{this.state.storyPassage}</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.storyInput}>
                        <TextInput ref={component => this._storyInput = component} placeholder={'type your piece here'} onChangeText={(text) => this.setState({ storyInput: text })} autoCapitalize={'none'} style={{ flex: 8 }} />
                        <Button onPress={() => this.onSendStoryInput()} style={{ flex: 2 }}>
                            Send
                        </Button>
                    </View>
                </View>
                <View style={styles.chatlogMemberListContainer}>
                    <View style={styles.chatlogContainer}>
                        <View style={styles.chatlogMessages}>
                            <ListView
                                dataSource={this.state.lobbyMessages}
                                renderRow={this.renderChatlog.bind(this)} />
                        </View>
                        <View style={styles.chatlogInput}>
                            <TextInput ref={component => this._chatInput = component} placeholder={'send a message'} onChangeText={(text) => this.setState({ chatInput: text })} autoCapitalize={'none'} style={{ flex: 8 }} />
                            <Button onPress={() => this.onSendChatInput()} style={{ flex: 2 }}>
                                Send
                        </Button>
                        </View>
                    </View>
                    
                    <View style={styles.memberListContainer}>
                        <Text>{this.state.memberCount} Members</Text>
                        <ListView
                            dataSource={this.state.memberList}
                            renderRow={this.renderMemberList.bind(this)} />
                    </View>
                    
                </View>
            </View>
        )
    }

    renderChatlog(rowData) {
        return (
            <View style={styles.chatMessage}>
                <Text>{rowData.username}</Text>
                <Text>{rowData.message}</Text>
            </View>
        )
    }

    renderMemberList(rowData) {
        return (
            <View style={styles.memberRow}>
                <Text>{rowData.user_id}</Text>
                <Text>{rowData.username}</Text>
            </View>
        )
    }

    onSendChatInput() {
        var input = this.state.chatInput;
        var body = JSON.stringify({
            message: input,
            lobby_id: this.props.lobby.id,
            user_id: this.props.user_id,
        });

        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobby_messages.json',
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

        this.setState({ chatInput: '' });
        this._chatInput.setNativeProps({ text: '' });
    }

    onSendStoryInput() {
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/stories/' + this.props.lobby.story_id + '.json',
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
        this.setState({ storyInput: '' });
        this._storyInput.setNativeProps({ text: '' });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#ffffff'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    storyContainer: {
        flex: 1,
    },

    storyPassage: {
        flex: 1,
    },

    chatlogMemberListContainer: {
        flex: 1,
        flexDirection: 'row'
    },

    storyInput: {
        flexDirection: 'row'
    },

    chatlogMessages: {
        flex: 1,
    },

    chatlogInput: {
        flexDirection: 'row'
    },

    chatlogContainer: {
        flex: 1,
    },

    storyTitle: {
        fontSize: 24
    }
});

export default Lobby;