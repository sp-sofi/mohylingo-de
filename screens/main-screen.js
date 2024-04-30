import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import TopicList from "../core/components/topic-list";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../core/constants";
import { useUser } from "../core/containers/UserProvider";
import Loader from '../core/components/Loader';
import Navbar from "../core/components/Navbar";


const styles= StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    sIcon: {
        fontSize: 28,
        color: '#4F009F',
        alignSelf: 'flex-start',
        fontFamily: 'Kodchasan',
        marginBottom: 18,
    },

    contentRow: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    contentButton: {
        flex: 1,
        height: 192,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    contentButtonText: {
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 36,
        alignSelf: 'center',
    },
    emoji: {
        fontSize: 54,

    },
});

const MainScreen = () => {
    const navigation = useNavigation();
    const { token, user } = useUser();

    const { isLoading, data: userProgress} = useQuery({
        queryKey: ['userProgress'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/userProgress/`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const topicProgress = userProgress?.data?.topic_progresses || [];

    return isLoading ? (
        <Loader />
    ) : (
        <View style={styles.container}>
            <Navbar title={`Hello, ${user?.username}`} />
            <View style={styles.contentRow}>
                <TouchableOpacity
                    style={[styles.contentButton, { backgroundColor: '#FFBBF8' }, { marginRight: 20 }]}
                    onPress={() => navigation.navigate("Messenger")}
                >
                    <Text style={styles.emoji}>😉</Text>
                    <Text style={styles.contentButtonText}>Let's{' \n'} talk</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.contentButton, { backgroundColor: '#FFF7AD' }]}>
                    <Text style={styles.emoji}>🤓</Text>
                    <Text style={styles.contentButtonText}>  Learn{' \n'}   new</Text>
                </TouchableOpacity>
            </View>
            <TopicList topics={topicProgress} />
        </View>
    );
};

export default MainScreen;
