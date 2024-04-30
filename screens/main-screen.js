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
    tabButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensure space between buttons
        marginBottom: 16, // Adjust as needed
    },
    tabButton: {
        height: 45,
        width: 123,
        borderRadius: 100,
        overflow: 'hidden',
    },
    tabButtonText: {
        color: '#4F009F',
        fontSize: 18,
        fontFamily: 'Kodchasan',
    },
    tabButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
            <Text style={styles.sIcon}>Hello, {user?.username}</Text>
            <View style={styles.tabButtons}>
                <TouchableOpacity style={styles.tabButton}>
                    <LinearGradient
                        colors={['#FFF7AD', '#FFA9F9']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.tabButtonGradient}
                    >
                        <Text style={styles.tabButtonText}>Tutorial</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, { backgroundColor: '#FFBBF8' }]}>
                    <View style={styles.tabButtonGradient}>
                        <Text style={styles.tabButtonText}>Main</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <LinearGradient
                        colors={['#FFF7AD', '#FFA9F9']}
                        style={styles.tabButtonGradient}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    >
                        <Text style={styles.tabButtonText}>Profile</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
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
