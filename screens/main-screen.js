import React, { useEffect } from 'react';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TopicList from "../core/components/topic-list";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "@tanstack/react-query";
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
    buttonText: {
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 36,
        alignSelf: 'center',
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
    buttonGradient: {
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    emoji: {
        fontSize: 54,
    },
    congratulations: {
        color: '#4F009F',
        fontSize: 42,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Kodchasan',
    },
    congratulationsText: {
        color: '#4F009F',
        fontSize: 36,
        textAlign: 'center',
        fontFamily: 'Kodchasan',
        marginBottom: 20,
    },
    congratulationsContainer: {
        flex: .8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const MainScreen = () => {
    const navigation = useNavigation();
    const { token, user } = useUser();

    const { isLoading, data: userProgress, refetch: refetchUserProgress} = useQuery({
        queryKey: ['userProgress'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/userProgress/`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const { mutate: startNewCourse, error } = useMutation({
        mutationFn: () => axios.post(`${BASE_API_URL}/start_new_course/`, {}, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        }),
        onSuccess: refetchUserProgress,
        onError: (error) => {
            Alert.alert("Submit Failed", error.message);
        }
    });

    const topicProgress = userProgress?.data?.topic_progresses || [];
    const isFinished = userProgress?.data?.is_finished;

    useEffect(() => {
        refetchUserProgress();
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <View style={styles.container}>
            <Navbar title={`Hello, ${user?.username}`} />
            {isFinished ? (
                <View style={styles.congratulationsContainer}>
                    <Text style={styles.congratulations}>Congratulations!</Text>
                    <Text style={styles.congratulationsText}>You have completed all topics</Text>
                    <TouchableOpacity
                        onPress={startNewCourse}
                    >
                        <LinearGradient
                            style={styles.buttonGradient}
                            colors={['#FFF7AD', '#FFA9F9']}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >
                            <Text style={styles.buttonText}>Start New Course 🎉</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
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
                </>
            )}
        </View>
    );
};

export default MainScreen;
