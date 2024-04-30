import React from 'react';
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import {useRoute} from "@react-navigation/native";
import Loader from '../core/components/Loader';
import Navbar from '../core/components/Navbar';
import { BASE_API_URL } from '../core/constants';
import { useUser } from '../core/containers/UserProvider';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    contentButton: {
        flex: 1,
        padding: 20,
        height: '100%',
        overflow: 'hidden',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    questionTitle: {
        color: '#4F009F',
        fontSize: 36,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonGradient: {
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 36,
        alignSelf: 'center',
    },
    congratulations: {
        color: '#4F009F',
        fontSize: 45,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Kodchasan',
    },
    congratulationsText: {
        color: '#4F009F',
        fontSize: 36,
        textAlign: 'center',
        fontFamily: 'Kodchasan',
    },
});

const TopicQuestionsLearn = () => {
    const route = useRoute()
    const { token } = useUser();
    const { topicId, topicProgressId } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState(null);

    const { isLoading: questionsLoading, data: questionsData } = useQuery({
        queryKey: ['nonLearnedQuestions'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/questions/nonLearned/?topic_id=${topicId}`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const questions = questionsData?.data;

    const {
        data: topicProgress,
        isLoading: topicProgressLoading,
        refetch: refetchTopicProgress,
    } = useQuery({
        queryKey: ['topicProgress'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/topicProgress/?id=${topicProgressId}`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const { mutate } = useMutation({
        mutationFn: (credentials) => axios.put(`${BASE_API_URL}/topicProgress/${topicProgressId}/learnQuestion/`, credentials),
        onSuccess: () => {
            setSelectedOption(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            refetchTopicProgress();
        },
        onError: (error) => {
            Alert.alert("Submit Failed", error.message);
        }
    });

    const currentQuestion = (!!questions?.length && questions.length > currentQuestionIndex) ? questions[currentQuestionIndex] : null;
    const isLoading = questionsLoading || topicProgressLoading;

    const questionsLearnedQuantity = topicProgress?.data?.questions_learned?.length;
    const totalQuestions = topicProgress?.data?.questions_total;
    const topicName = `${topicProgress?.data?.topic?.name} ${questionsLearnedQuantity}/${totalQuestions}`;

    const validateAnswer = () => {
        const correctAnswer = +currentQuestion?.answer;
        const isCorrect = +selectedOption === correctAnswer;
        console.log(isCorrect, 'isCorrect');
        console.log(selectedOption, 'selectedOption');
        console.log(correctAnswer, 'correctAnswer');

        if (isCorrect)
            mutate({ question_id: currentQuestion?.id });
        else {
            Alert.alert("Incorrect Answer", "Try again");
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <View style={styles.container}>
            <Navbar title={topicName} />
            {currentQuestion ? (
                <View>
                    <Text style={styles.questionTitle}>
                        {currentQuestion.text}
                    </Text>
                    <FlatList
                        numColumns={2}
                        contentContainerStyle={{ width: '100%', justifyContent: 'center' }}
                        data={currentQuestion.options}
                        renderItem={({ item }) => (
                            <LinearGradient
                                colors={['#FFF7AD', '#FFA9F9']}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                style={{ borderRadius: 40, marginVertical: 10, padding: 5, margin: 10 }} // Update this line
                            >
                                <TouchableOpacity
                                    style={{...styles.contentButton, backgroundColor: selectedOption === item.id ? 'transparent' : 'white' }}
                                    onPress={() => {
                                        setSelectedOption(item.id);
                                    }}
                                >
                                    <Text style={styles.contentButtonText}>{item.text}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={validateAnswer}
                    >

                    <LinearGradient
                        style={styles.buttonGradient}
                        colors={['#FFF7AD', '#FFA9F9']}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    >
                        <Text style={styles.buttonText}>Check</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            ) : (
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", height: '70%' }}>
                    <Text style={styles.congratulations}>
                        Congratulations!
                    </Text>
                    <Text style={styles.congratulationsText}>
                        You have learned all the questions in this topic
                    </Text>
                </View>
            )}
        </View>
    );
}


export default TopicQuestionsLearn;
