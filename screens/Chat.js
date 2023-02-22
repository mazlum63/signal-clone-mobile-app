import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useLayoutEffect } from 'react'

const Chat = ({ navigation, route }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerRight: () => (
                <View style={styles.chatUser}>
                    <Text>{route.params.chatName}</Text>
                    <Image source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Icon-people.png'
                    }}
                        style={styles.chatAvatar}
                    />
                </View>
            ),
        })
    }, [messages])

    const sendMessage = async () => {
        setMessages([...messages, message])
        setMessage('')
    }
    return (
        <KeyboardAvoidingView style={styles.chatContainer}>
            <ScrollView style={styles.messagesContainer}>
                {
                    messages.map((items, index) => (
                        <Text style={styles.messageText} key={index}>{items}</Text>
                    ))
                }
            </ScrollView>
            <View style={styles.sendMessage}>
                <TextInput style={styles.sendInput}
                    placeholder='Send a message'
                    type='text'
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />

                <TouchableOpacity
                    title='Send'
                    style={styles.sendBtn}
                    onPress={() => sendMessage()}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Chat

const styles = StyleSheet.create({
    chatUser: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    chatAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10
    },
    chatContainer: {
        display: 'flex',
        flexDirection: "column",
        height: '100%',
        padding: 5
    },
    messagesContainer: {
        flex: 1,
        padding: 5
    },
    messageText: {
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#ccc',
        fontSize: 20,
        borderRadius: 20

    },
    sendMessage: {
        flexDirection: 'row'
    },
    sendInput: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#ddd',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        marginRight: 5,
        borderRadius: 20
    },
    sendBtn: {
        borderRadius: 20,
        backgroundColor: '#2C6BED',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: 50
    }
})