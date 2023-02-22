import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useLayoutEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase';
import React from 'react'
import ChatListItem from '../components/ChatListItem';

export default function HomeScreen({ navigation }) {
    const [currentUser, setCurrentUser] = useState('');
    const [chats, setChats] = useState([]);

    const signout = () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        }).catch((error) => {
            alert(error)
        });
    }

    const getChats = async () => {
        const newChats = [];
        setChats(newChats)
        const querySnapshot = await getDocs(collection(db, "Chat"));
        querySnapshot.forEach((doc) => {
            const data = [doc.id, doc.data().name]
            setChats([...newChats, data])
            newChats.push(data)
        });
        setChats(newChats)
    }

    useEffect(() => {
        getChats()
    }, [navigation])


    useLayoutEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user.displayName);
            }
        });

        navigation.setOptions({
            title: currentUser
        })
        navigation.setOptions({
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: "black", fontSize: 12 },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Image source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Icon-people.png'
                    }}
                        style={styles.userAvatar}
                    />
                </View>
            ),
            headerRight: () => (
                <View style={{ display: 'flex', flexDirection: "row" }}>
                    <TouchableOpacity
                        style={styles.headerBtn}
                        title='Add Chat'
                        onPress={() => navigation.navigate("Addchat")}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                            Add Chat
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerBtn}
                        title='Sign out'
                        onPress={() => signout()}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                            Sign out
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id: id,
            chatName: chatName
        })
    }
    return (
        <View>
            {/*  <TouchableOpacity
                style={{ backgroundColor: '#2C6BED', margin: 10 }}
                title='Show/Refresh All Chats'
                onPress={() => getChats()}

            >
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
                    Show/Refresh All Chats
                </Text>
            </TouchableOpacity> */}
            <ScrollView style={{ paddingTop: 5 }}>
                {chats.map((item) => (
                    <ChatListItem key={item[0]} item={item} enterChat={enterChat} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    headerBtn: {
        backgroundColor: '#2C6BED',
        marginLeft: 10,
        padding: 10
    }
})