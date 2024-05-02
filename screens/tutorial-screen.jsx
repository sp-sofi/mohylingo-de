import React from 'react';
import axios from "axios";
import FlipCard from 'react-native-flip-card';
import { useQuery, useMutation } from "@tanstack/react-query";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
    cardContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    card: {
        width: '100%',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    gradientCard: {
        display: 'flex',
        height: 500,
        borderRadius: 50,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

const TutorialScreen = () => {
    const { token } = useUser();
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
    const [isShowNext, setIsShowNext] = React.useState(false);

    const { isLoading: lexemesLoading, data: lexemesData } = useQuery({
        queryKey: ['nonLearnedWords'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/lexemes/nonLearned/`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const { isLoading: userProgressLoading, data: userProgress, refetch: refetchUserProgress } = useQuery({
        queryKey: ['userProgress'],
        queryFn: () => axios.get(
            `${BASE_API_URL}/userProgress/`,
            {headers: {
                'Authorization': `Token ${token}`,
            }}
        ),
    });

    const words = lexemesData?.data?.non_learned_lexemes;

    const { mutate, isPending: learnWordLoading } = useMutation({
        mutationFn: (credentials) => axios.put(
            `${BASE_API_URL}/userProgress/1/learnWord/`,
            credentials,
            {
                headers: {
                'Authorization': `Token ${token}`,
                },
            },
        ),
        onSuccess: () => {
            setIsShowNext(false);
            setCurrentWordIndex(currentWordIndex + 1);
            refetchUserProgress();
        },
        onError: (error) => {
            Alert.alert("Submit Failed", error.message);
        }
    });

    const currentWord = (!!words?.length && words.length > currentWordIndex) ? words[currentWordIndex] : null;
    const isLoading = lexemesLoading || userProgressLoading;

    const wordsLearnedQuantity = userProgress?.data?.words_learned?.length;
    const totalWords = lexemesData?.data?.total_lexemes;

    const learnWord = () => {
        mutate({ word_id: currentWord?.id });
    };

    return isLoading ? (
        <Loader />
    ) : (
        <View style={styles.container}>
            <Navbar title={`Words Learned ${wordsLearnedQuantity}/${totalWords}`} />
            {learnWordLoading ? (
                <Loader />
            ) : currentWord ? (
                <View style={styles.cardContainer}>
                    <FlipCard
                        clickable
                        friction={6}
                        perspective={1000}
                        flipHorizontal
                        flipVertical={false}
                        onFlipEnd={() => setIsShowNext(true)}
                    >
                        <View style={styles.card}>
                            <LinearGradient
                                colors={['#FFF7AD', '#FFA9F9']}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                style={styles.gradientCard}
                            >
                                <Text style={styles.contentButtonText}>
                                    {currentWord.text}
                                </Text>
                            </LinearGradient>
                        </View>
                        <View style={styles.card}>
                            <LinearGradient
                                colors={['#FFA9F9', '#FFF7AD']}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                style={styles.gradientCard}
                            >
                                <Text style={styles.contentButtonText}>{currentWord.translation}</Text>
                            </LinearGradient>
                        </View>
                    </FlipCard>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={learnWord}
                    >
                        {isShowNext && (
                            <LinearGradient
                                style={styles.buttonGradient}
                                colors={['#FFF7AD', '#FFA9F9']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            >
                                <Text style={styles.buttonText}>Next</Text>
                            </LinearGradient>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", height: '70%' }}>
                    <Text style={styles.congratulations}>
                        Congratulations!
                    </Text>
                    <Text style={styles.congratulationsText}>
                        You have learned all the words in this course
                    </Text>
                </View>
            )}
        </View>
    );
}


export default TutorialScreen;
