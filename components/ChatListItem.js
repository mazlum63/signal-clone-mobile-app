import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ChatListItem({ item, enterChat }) {
    return (
        <TouchableOpacity key={item[0]} onPress={() => enterChat(item[0], item[1])} style={styles.chatContainer}>
            <View style={styles.chatAvatar}><Image
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Icon-people.png'
                }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
            /></View>
            <View style={styles.textContainer}>
                <Text style={styles.textName}>{item[1]}</Text>
                <Text style={styles.textSubtitle} numberOfLines={1} ellipsizeMode='tail'>{item[1]}</Text>
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    chatContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        alignItems: 'center',
        margin: 5,
    },
    chatAvatar: {
        marginRight: 20
    },
    textContainer: {
        flex: 1,
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 20
    },
    textSubtitle: {

    }
})