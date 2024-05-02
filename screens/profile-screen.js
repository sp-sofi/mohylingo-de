import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import TopicList from "../core/components/topic-list";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../core/constants";
import { useUser } from "../core/containers/UserProvider";
import Loader from '../core/components/Loader';
import Navbar from "../core/components/Navbar";
import GradientCircularProgress from "../core/components/GradientCircularProgress";



const styles= StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    aligner: {
        flex: 1,
        alignItems: 'center',
    },
    progresses: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    sIcon: {
        fontSize: 28,
        color: '#4F009F',
        alignSelf: 'flex-start',
        fontFamily: 'Kodchasan',
        marginBottom: 18,
    },

    contentButton: {
        flex: 1,
        height: 192,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    tabButtonGradient: {
        display: 'flex',
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
    },
    progressText: {
        color: '#4F009F',
        fontSize: 18,
        fontFamily: 'Kodchasan',
        alignItems: 'center',
    },
    progressNumber: {
        color: '#4F009F',
        fontSize: 24,
        fontFamily: 'KodchasanBold',
    },
    contentButtonText: {
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 36,
        alignSelf: 'center',
        marginBottom: 66,
    },
    emoji: {
        fontSize: 122,
        marginTop: 22,
        marginBottom: 12,
    },
    progressContainer: {
        height: 231,
        width: 229,
        borderRadius: 35,
        backgroundColor: '#FFBBF8',
        flex: 2,
        marginRight: 10,
    },
    progressBarContainer: {
        marginTop:10,
        alignItems: 'center',
        height: 155,
        borderRadius: 20,
    },
});

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { token, user, logout } = useUser();
    const courseProgress = 55;
    const wordsLearned = 555;
    const days = 22;

    const { isLoading, data: userProgress} = useQuery({
        queryKey: ['userProgress'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/userProgress/`,
            {headers: {
                    'Authorization': `Token ${token}`,
                }}
        ),
    });

    // const topicProgress = userProgress?.data?.topic_progresses || [];

    return isLoading ? (
        <Loader />
    ) : (
        <View style={styles.container}>
            <Navbar title={`Profile`} />
            <View style={styles.aligner}>
                <Text style={styles.emoji}>😉</Text>
                <Text style={styles.contentButtonText}>Hello, {user?.username}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', flex: 3, justifyContent: 'space-beetween' }}>
                    <View
                        style={styles.progressContainer}
                    >
                        <View style={styles.progressBarContainer}>
                            <GradientCircularProgress size={200} strokeWidth={20} percentage={courseProgress} />
                        </View>
                    </View>
                    <View style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-beetween' }}>
                        <LinearGradient
                            colors={['#FFF7AD', '#FFA9F9']}
                            style={{ ...styles.tabButtonGradient, marginBottom: 5 }}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >
                            <Text style={styles.progressNumber}>{wordsLearned}</Text>
                            <Text style={styles.progressText}>Words learned</Text>
                        </LinearGradient>
                        <LinearGradient
                            colors={['#FFF7AD', '#FFA9F9']}
                            style={styles.tabButtonGradient}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >
                            <Text style={styles.progressNumber}>{days}</Text>
                            <Text style={styles.progressText}>Words learned</Text>
                        </LinearGradient>
                    </View>
                </View>
                <LinearGradient style={{ height: 88, width: 285, borderRadius:35,  }}
                    colors={['#FFF7AD', '#FFA9F9']}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                >
                <TouchableOpacity
                    onPress={() => {
                        logout();
                        navigation.navigate("Login");
                    }}
                >
                    <Text style={{ textAlign:'center', color: '#4F009F',
                        fontFamily: 'Kodchasan',
                        fontSize: 32,
                        marginTop: 25,
                        alignSelf: 'center',
                         }}
                    >
                        LOG OUT
                    </Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

export default ProfileScreen;