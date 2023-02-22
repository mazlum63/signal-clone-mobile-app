import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            }
        });
        navigation.setOptions({
            title: 'Add a new Chat',
            headerLeft: () => (
                <Text onPress={() => navigation.goBack()} style={{ marginRight: 10, fontWeight: 'bold', color: '#2C6BED' }}>{`< Chats`}</Text>
            )

        })
    }, [currentUser])
    const createChat = async () => {
        await addDoc(collection(db, "Chat"), {
            name: input
        });
        navigation.goBack()

    }
    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>AddChat</Text>
            <TextInput
                style={styles.chatName}
                placeholder='Enter a chat name'
                value={input}
                onChangeText={test => setInput(test)} />
            <Button title='Create' onPress={() => createChat()} />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    chatName: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 15,
        marginBottom: 15,
        padding: 5
    }
})