import { StatusBar, View, TouchableOpacity, Image, StyleSheet, TextInput, Text, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.replace("Home")
            })
            .catch((error) => {
                alert(error)
            });
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("Home")
            }
        });
    }, [navigation])


    return (
        <KeyboardAvoidingView style={style.loginScreen}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle='light-content'
                hidden={false}
            />
            <Image
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/240px-Signal-Logo.svg.png',
                }}
                style={style.loginLogo}
            />
            <View style={{ width: '100%' }}>
                <TextInput
                    placeholder='Email'
                    autoFocus
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
                    onPress={() => signin()}
                >
                    <Text style={style.loginButton}>Login</Text>
                </TouchableOpacity>
                <Button title='Register' onPress={() => navigation.navigate('Register')} />
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