import React from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

import {useRoute} from "@react-navigation/native";
import Loader from '../core/components/Loader';

const styles = StyleSheet.create({
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

const TopicQuestionsLearn = () => {
    const route = useRoute()
    const { topicId, topicProgressId } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

    const { isLoading: questionsLoading, data: questions } = useQuery({
        queryKey: ['nonLearnedQuestions'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/nonLearnedQuestions/${topicId}`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const { isLoading: topicProgressLoading, data: topicProgress } = useQuery({
        queryKey: ['topicProgress'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/topicProgress/?id=${topicProgressId}`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const { mutate } = useMutation({
        mutationFn: (credentials) => axios.post(`${BASE_API_URL}/login/`, credentials),
        onSuccess: () => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        },
        onError: (error) => {
            Alert.alert("Submit Failed", error.message);
        }
    });

    const currentQuestion = questions?.length <= currentQuestionIndex ? questions?.data[currentQuestionIndex] : null;
    const isLoading = questionsLoading || topicProgressLoading;

    return isLoading ? (
        <Loader />
    ) : (
        <View style={styles.container}>
            {currentQuestion ? (
                <View>
                    <Text>{currentQuestion.question}</Text>
                    <FlatList
                        data={currentQuestion.answers}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.contentButton}
                                onPress={() => {
                                    mutate({
                                        question_id: currentQuestion.id,
                                        answer_id: item.id,
                                    });
                                }}
                            >
                                <Text style={styles.contentButtonText}>{item.answer}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : (
                <Text>No questions to learn</Text>
            )}
        </View>
    );
}


export default TopicQuestionsLearn;
