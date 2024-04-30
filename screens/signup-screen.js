import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView} from 'react-native';
import {useUser} from "../core/containers/UserProvider";
import {useNavigation} from "@react-navigation/native";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {BASE_API_URL} from "../core/constants";
import { Picker } from "@react-native-picker/picker";

const styles= StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 100,
    },
    title: {
        fontFamily: 'Kodchasan',
        fontSize: 48,
        color: '#4F009F',
        textAlign: 'center',
        marginBottom: 50,
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
    button: {
        width: 132,
        height: 132,
        borderRadius: 66,
        backgroundColor: '#FFF7AD',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },
    buttonText: {
        fontSize: 32,
        color: '#4F009F',
        fontFamily: 'Kodchasan',
    },
    picker: {
        width: 400,
        flex: 0.4,
        height: 10, // Height is necessary on iOS
        backgroundColor: '#fff',
        color: '#4F009F',
    },
    pickerLabel: {
        fontFamily: 'Kodchasan',
        fontSize: 30,
        color: '#4F009F',
        textAlign: 'center',
    },
});

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [levelId, setLevelId] = useState(null);

    const { isLoading, isError: isLevelsError, data: levels, error: levelsError } = useQuery({
        queryKey: ['levels'],
        queryFn: () => axios.get(`${BASE_API_URL}/levels/`),
    });

    const levelsOptions = levels?.data || [];

    const {
        user,
        token,
        setUser,
        storeToken,
    } = useUser();
    const navigation = useNavigation();

    const { mutate } = useMutation({
        mutationFn: (credentials) => axios.post(`${BASE_API_URL}/users/`, credentials),
        onSuccess: (data) => {
            // Handle success, e.g., store auth tokens, navigate
            storeToken(data.data.token);
            setUser({
                user_id: data.data.user_id,
                username: data.data.username,
            });
        },
        onError: (error) => {
            Alert.alert("Sign up Failed", error.message);
        }
    });

    const handleSignUp = () => {
        mutate({
            email,
            username,
            password,
            level_id: levelId,
        });
    };

    useEffect(() => {
        if (token && user) {
            navigation.navigate('Main');
        }
    }, [token, user]);

    return isLoading ? null : (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign Up</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#fff"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            textContentType="emailAddress"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Retype password"
                            placeholderTextColor="#fff"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <Text style={styles.pickerLabel}>Select your level:</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={levelId}
                            onValueChange={(itemValue) => setLevelId(itemValue)}
                        >
                            {levelsOptions.map(({ id, name }) =>
                                <Picker.Item key={id} label={name} value={id} />
                            )}
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>UP</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignupScreen;