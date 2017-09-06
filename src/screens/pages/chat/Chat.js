import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const cable = ActionCable.createConsumer('ws://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/cable');

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageData: [{}],
        };
        var t = this;
        cable.subscriptions.create(
            { channel: "ChatChannel", room: this.props.friend.id },
            {
                received(msg) {
                    console.log(msg)

                    if (msg.sender_id != t.props.user.id) {
                        var message = {
                            _id: msg.id,
                            text: msg.message,
                            createdAt: new Date(msg.created_at),
                            user: {
                                _id: msg.sender_id,
                                name: msg.username,
                                avatar: ''
                            }
                        }

                        t.setState((previousState) => ({
                            messages: GiftedChat.append(previousState.messages, message),
                        }));
                    }
                }
            }
        );

        this.fetchChat();
    }

    fetchChat() {
        var body = JSON.stringify({
        });
        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/chat_messages/retrieve/' + this.props.friend.id,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                return (response.json())
            })
            .then((responseJSON) => {
                console.log(responseJSON)
                var currMessages = [];
                responseJSON.forEach(function (msg) {
                    var message = {
                        _id: msg.id,
                        text: msg.message,
                        createdAt: new Date(msg.created_at),
                        user: {
                            _id: msg.sender_id,
                            name: msg.username,
                            avatar: ''
                        }
                    }

                    currMessages.push(message);
                }, this);
                this.setState((previousState) => ({ messages: GiftedChat.append(previousState.messages, currMessages) }))
                console.log(currMessages)
            })
    }


    componentWillMount() {
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        var input = messages[0].text;
        var body = JSON.stringify({
            message: input,
            sender_id: this.props.user.id,
            recipient_id: this.props.friendId,
            connection_id: this.props.friend.id,
            username: this.props.user.nickname
        });

        fetch('http://ec2-13-59-214-6.us-east-2.compute.amazonaws.com/chat_messages.json',
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
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: this.props.user.id,
                }}
            />
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
});

export default Chat;