import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {BASE_API_URL} from "../core/constants";
import {useUser} from "../core/containers/UserProvider";

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontFamily: 'Kodchasan',
        fontSize: 48,
        color: '#4F009F',
        textAlign: 'left',
        marginBottom: 100,
        alignSelf: 'flex-start', // Align to the top-left corner
    },
    inputContainer: {
        alignItems: 'center', // Center input fields horizontally
    },
    input: {
        height: 100,
        width: 400,
        backgroundColor: '#FFBBF8',
        marginBottom: 20,
        paddingHorizontal: 30,
        fontSize: 24,
        borderRadius: 100,
        color: '#fff',
        fontFamily: 'Kodchasan',
    },
    roundedButton: {
        width: 132,
        height: 132,
        borderRadius: 66,
        backgroundColor: '#FFF7AD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        height: 132,
        borderRadius: 10,
        backgroundColor: '#FFF7AD',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 32,
        color: '#4F009F',
        fontFamily: 'Kodchasan',
    },
});
const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {
        user,
        token,
        setUser,
        storeToken,
    } = useUser();
    const navigation = useNavigation();

    const { mutate, isError, error } = useMutation({
        mutationFn: (credentials) => axios.post(`${BASE_API_URL}/login/`, credentials),
        onSuccess: (data) => {
            // Handle success, e.g., store auth tokens, navigate
            storeToken(data.data.token);
            setUser({
                user_id: data.data.user_id,
                username: data.data.username,
            });
        },
        onError: (error) => {
            Alert.alert("Login Failed", error.message);
        }
    });

    const handleLogin = () => {
        mutate({ username, password });
    };

    useEffect(() => {
        if (token && user) {
            navigation.navigate('Main');
        }
    }, [token, user]);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Log in to empower your English</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Login"
                        placeholderTextColor="#fff"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity style={styles.roundedButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>IN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Sign Up")}>
                    <Text style={styles.buttonText}>Sign UP</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;