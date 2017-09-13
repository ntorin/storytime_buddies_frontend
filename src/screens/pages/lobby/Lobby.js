import React from 'react';
import { StyleSheet, View, ScrollView, ListView, Text, TextInput } from 'react-native';
import Chatlog from '../../../components/Chatlog';
import ActionCable from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider';
import Button from 'apsl-react-native-button';
import { iconsMap, iconsLoaded } from '../../../helpers/icons-loader';
import { Navigation } from 'react-native-navigation';


const cable = ActionCable.createConsumer('ws://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/cable');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


class Lobby extends React.Component {
    static navigatorButtons = {
        rightButtons: [{
            icon: iconsMap['pencil'],
            id: 'actions',
        }]
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        console.log(this.props.lobby)
        this.state = {
            storyInput: '',
            chatInput: '',
            story: {},
            lobby: this.props.lobby,

            messageData: [{}],
            lobbyMessages: ds.cloneWithRows([]),

            memberCount: 0,
            memberData: [{}],
            memberList: ds.cloneWithRows({})

        }
        var t = this;
        cable.subscriptions.create(
            { channel: "LobbyChannel", room: this.props.lobby.id },
            {
                received(emit) {
                    console.log(emit)
                    switch (emit.action) {
                        case 'ActionJoin': case 'ActionLeave':
                            t.updateMemberList(emit.members);
                            break;
                        case 'ActionRename': case 'ActionAppendStory':
                            t.updateStory(emit.story);
                            break;
                        case 'ActionEditPassword':
                            t.updateLobby(emit.lobby);
                            break;
                        case 'ActionComplete': case 'ActionAbandon': case 'ActionSelectStory':
                            t.updateLobby(emit.lobby);
                            t.fetchStory();
                            break;
                        case 'ActionMessage':
                            t.updateChatlog(emit.message);
                            break;
                    }
                }
            }
        );

        this.joinLobby();
        this.fetchStory();
        this.fetchMemberList();
    }

    componentWillUnmount() {
        this.leaveLobby();
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'actions') { // this is the same id field from the static navigatorButtons definition
                Navigation.showLightBox({
                    screen: "storytime_buddies_frontend.LobbyActions", // unique ID registered with Navigation.registerScreen
                    title: "Lobby Actions", // title of the screen as appears in the nav bar (optional)
                    passProps: {}, // simple serializable object that will pass as props to the modal (optional)
                    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                    navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
                    animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
                });
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.storyContainer}>
                    <View style={styles.storyPassage}>
                        <View>
                            <Text style={[styles.white, styles.storyTitle]}>{this.state.story.name}</Text>
                        </View>
                        <ScrollView>
                            <Text style={styles.white}>{this.state.story.passage}</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.storyInput}>
                        <TextInput ref={component => this._storyInput = component}
                            placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22'
                            placeholder={'type your piece here'} onChangeText={(text) => this.setState({ storyInput: text })} autoCapitalize={'none'} style={styles.input} />
                        <Button style={styles.sendButton} textStyle={styles.buttonText} onPress={() => this.onSendStoryInput()}>
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
                            <TextInput ref={component => this._chatInput = component}
                                placeholderTextColor='#ffffff' underlineColorAndroid='#ffffff' selectionColor='#e14f22'
                                placeholder={'send a message'} onChangeText={(text) => this.setState({ chatInput: text })} autoCapitalize={'none'} style={styles.input} />
                            <Button style={styles.sendButton} textStyle={styles.buttonText} onPress={() => this.onSendChatInput()}>
                                Send
                        </Button>
                        </View>
                    </View>

                    <View style={styles.memberListContainer}>
                        <Text style={styles.white}>{this.state.memberCount} Members</Text>
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
                <Text style={styles.white}>{rowData.username}: {rowData.message}</Text>
            </View>
        )
    }

    renderMemberList(rowData) {
        return (
            <View style={styles.memberRow}>
                <Text style={styles.white}>{rowData.user_id}</Text>
                <Text style={styles.white}>{rowData.username}</Text>
            </View>
        )
    }

    joinLobby() {
        var body = JSON.stringify({
            user_id: this.props.user.id
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies/join/' + this.props.lobby.id,
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
                console.log(responseJSON);
            });
    }

    leaveLobby() {
        var body = JSON.stringify({
            user_id: this.props.user.id
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies/leave/' + this.state.lobby.id,
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
                console.log(responseJSON);
            });
    }

    fetchStory() {
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/stories/' + this.state.lobby.story_id + '.json')
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({ story: responseJSON });
            });
    }

    fetchMemberList() {
        console.log("getting members");
        var body = JSON.stringify({
            user_id: this.props.user.id
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies/members/' + this.state.lobby.id,
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
                console.log(responseJSON);
                this.setState({ memberData: responseJSON });
                this.setState({ memberList: ds.cloneWithRows(responseJSON), memberCount: this.state.memberData.length });
            });
    }

    renameStory() {

    }

    completeStory() {

    }

    abandonStory() {

    }

    selectStory() {

    }

    editLobbyPassword() {

    }

    updateStory(story) {
        this.setState({ story: story });
        console.log(this.state.story)
    }

    updateMemberList(members) {
        this.setState({ memberData: members });
        this.setState({ memberList: ds.cloneWithRows(this.state.memberData), memberCount: this.state.memberData.length });
    }

    updateLobby(lobby) {
        this.setState({ lobby: lobby });
    }

    updateChatlog(message) {
        t.setState({ messageData: t.state.messageData.concat(message) })
        t.setState({ lobbyMessages: ds.cloneWithRows(t.state.messageData) })
    }



    onSendChatInput() {
        var input = this.state.chatInput;
        var body = JSON.stringify({
            message: input,
            lobby_id: this.state.lobby.id,
            user_id: this.props.user.id,
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
        var input = this.state.storyInput;
        var body = JSON.stringify({
            story_input: input,
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/lobbies/append_story/' + this.state.lobby.id,
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
        backgroundColor: '#4e4e4e'
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
    },

    sendButton: {
        flex: 2,
        borderColor: '#e14f22',
        borderWidth: 1
    },

    buttonText: {
        color: '#e14f22'
    },

    white: {
        color: '#ffffff',
    },

    input: {
        flex: 8,
        textAlign: 'center',
        color: "#ffffff",
    },
});

export default Lobby;