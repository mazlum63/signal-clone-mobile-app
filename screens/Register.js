import { StatusBar, View, TouchableOpacity, Image, StyleSheet, TextInput, Text, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Register({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                })
            })
            .catch((error) => {
                alert(error)
            });
    }
    return (
        <KeyboardAvoidingView style={style.loginScreen}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle='light-content'
                hidden={false}
            />
            <Text style={style.loginHeader}>Create a Signal Account</Text>
            <Image
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/240px-Signal-Logo.svg.png',
                }}
                style={style.loginLogo}
            />
            <View style={{ width: '100%' }}>
                <TextInput
                    placeholder='Name'
                    autoFocus
                    type='text'
                    style={style.loginInput}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    placeholder='Email'
                    type='email'
                    style={style.loginInput}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder='Password'
                    type='password'
                    secureTextEntry
                    style={style.loginInput}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    title='Login'
                    style={{ marginTop: 10, marginBottom: 10 }}
                    onPress={() => register()}
                >
                    <Text style={style.loginButton}>Register</Text>
                </TouchableOpacity>
                <Button title='Login' onPress={() => navigation.navigate('Login')} />
            </View>
        </KeyboardAvoidingView>
    )
}


const style = StyleSheet.create({
    loginScreen: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginHeader: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    loginLogo: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    loginInput: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#2C6BED',
        color: '#fff',
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
})